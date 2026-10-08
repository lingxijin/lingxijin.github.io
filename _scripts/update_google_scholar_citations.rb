# frozen_string_literal: true

require "yaml"
require "nokogiri"
require "open-uri"
require "uri"
require "cgi"
require "fileutils"

ROOT = File.expand_path("..", __dir__)

SOCIALS_PATH   = File.join(ROOT, "_data", "socials.yml")
BIB_PATH       = File.join(ROOT, "_bibliography", "papers.bib")
CITATIONS_PATH = File.join(ROOT, "_data", "citations.yml")

USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " \
  "AppleWebKit/537.36 (KHTML, like Gecko) " \
  "Chrome/131.0 Safari/537.36"


# ---------------------------------------------------------
# Read Scholar user ID
# ---------------------------------------------------------

socials =
  YAML.safe_load(
    File.read(SOCIALS_PATH),
    permitted_classes: [],
    aliases: false
  ) || {}

scholar_userid =
  socials["scholar_userid"].to_s.strip

if scholar_userid.empty?
  abort "scholar_userid is missing from _data/socials.yml"
end


# ---------------------------------------------------------
# Read article IDs used in papers.bib
# ---------------------------------------------------------

bib_content =
  File.read(BIB_PATH)

article_ids =
  bib_content
    .scan(/google_scholar_id\s*=\s*[\{\"]([^}\"]+)[}\"]/i)
    .flatten
    .map(&:strip)
    .uniq

if article_ids.empty?
  abort "No google_scholar_id fields found in papers.bib"
end

puts "Found #{article_ids.length} Google Scholar article IDs in papers.bib."


# ---------------------------------------------------------
# Read existing cache
# ---------------------------------------------------------

existing =
  if File.exist?(CITATIONS_PATH)
    YAML.safe_load(
      File.read(CITATIONS_PATH),
      permitted_classes: [],
      aliases: false
    ) || {}
  else
    {}
  end

existing =
  existing.transform_keys(&:to_s)


# ---------------------------------------------------------
# Fetch Scholar profile
#
# One profile request gives citation data for many papers,
# which is much more stable than requesting every article
# separately.
# ---------------------------------------------------------

fetched = {}

cstart = 0
page_size = 100
max_pages = 5

max_pages.times do |page_index|

  url =
    "https://scholar.google.com/citations?" \
    "user=#{CGI.escape(scholar_userid)}" \
    "&hl=en" \
    "&cstart=#{cstart}" \
    "&pagesize=#{page_size}"

  puts "Fetching Scholar profile page #{page_index + 1}..."

  html =
    URI.open(
      url,
      "User-Agent" => USER_AGENT,
      "Accept-Language" => "en-US,en;q=0.9",
      open_timeout: 20,
      read_timeout: 30
    ).read

  doc =
    Nokogiri::HTML(html)

  rows =
    doc.css("#gsc_a_b .gsc_a_tr")

  if page_index.zero? && rows.empty?
    abort(
      "Google Scholar returned no publication rows. " \
      "The request may have been blocked. Existing citation data was not changed."
    )
  end

  rows.each do |row|

    title_link =
      row.at_css(".gsc_a_at")

    next unless title_link

    href =
      title_link["href"].to_s

    next if href.empty?

    begin
      query =
        URI.parse(
          "https://scholar.google.com#{href}"
        ).query

      params =
        CGI.parse(query.to_s)

      citation_for_view =
        params["citation_for_view"]&.first

      next unless citation_for_view

      parts =
        citation_for_view.split(":", 2)

      next unless parts.length == 2

      article_id =
        parts[1]

      citation_link =
        row.at_css(".gsc_a_c a")

      citation_text =
        citation_link&.text.to_s.strip

      citation_count =
        if citation_text.empty?
          0
        else
          citation_text.gsub(/[^\d]/, "").to_i
        end

      fetched[article_id] =
        citation_count

    rescue StandardError => e

      warn(
        "Could not parse one Scholar row: " \
        "#{e.class}: #{e.message}"
      )

    end

  end


  # No more pages
  break if rows.length < page_size

  cstart += page_size

  sleep 3

end


# ---------------------------------------------------------
# Safety check
# ---------------------------------------------------------

matched_ids =
  article_ids &
  fetched.keys

if matched_ids.empty?

  abort(
    "None of the google_scholar_id values in papers.bib " \
    "were found on the Scholar profile. " \
    "Existing citation data was not changed."
  )

end


puts "Matched #{matched_ids.length} papers on Google Scholar."


# ---------------------------------------------------------
# Update only successfully fetched papers
#
# Important:
# If Scholar fails to return a paper, preserve its old count.
# ---------------------------------------------------------

updated =
  existing.dup

article_ids.each do |article_id|

  if fetched.key?(article_id)

    updated[article_id] =
      fetched[article_id]

    puts(
      "#{article_id}: " \
      "#{existing[article_id] || 'new'} -> " \
      "#{fetched[article_id]}"
    )

  elsif existing.key?(article_id)

    puts(
      "#{article_id}: not returned by Scholar; " \
      "keeping cached value #{existing[article_id]}"
    )

  else

    warn(
      "#{article_id}: no Scholar result and no cached value"
    )

  end

end


# ---------------------------------------------------------
# Write cache atomically
# ---------------------------------------------------------

FileUtils.mkdir_p(
  File.dirname(CITATIONS_PATH)
)

sorted =
  updated
    .sort
    .to_h

temp_path =
  "#{CITATIONS_PATH}.tmp"

File.write(
  temp_path,
  YAML.dump(sorted)
)

File.rename(
  temp_path,
  CITATIONS_PATH
)

puts
puts "Updated #{CITATIONS_PATH}"
