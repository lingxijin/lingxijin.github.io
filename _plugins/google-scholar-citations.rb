# frozen_string_literal: true

require "active_support/all"


module Helpers
  extend ActiveSupport::NumberHelper
end


module Jekyll

  class GoogleScholarCitationsTag < Liquid::Tag

    def initialize(
      tag_name,
      params,
      tokens
    )

      super

      splitted =
        params
          .split(" ")
          .map(&:strip)

      @scholar_id =
        splitted[0]

      @article_id =
        splitted[1]

    end


    def render(context)

      article_id =
        context[
          @article_id.strip
        ].to_s


      site =
        context.registers[
          :site
        ]


      citations =
        site.data[
          "citations"
        ] || {}


      citation_count =
        citations[
          article_id
        ]


      # Article not yet cached
      if citation_count.nil?
        return "N/A"
      end


      Helpers.number_to_human(
        citation_count.to_i,
        format: "%n%u",
        precision: 2,
        units: {
          thousand: "K",
          million: "M",
          billion: "B"
        }
      )

    end

  end

end


Liquid::Template.register_tag(
  "google_scholar_citations",
  Jekyll::GoogleScholarCitationsTag
)
