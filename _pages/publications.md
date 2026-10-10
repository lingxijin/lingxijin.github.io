---
layout: page
permalink: /publications/
title: publications
description: publications by status and year.
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

{% include bib_search.liquid %}

<div class="publications">

## Under Review

{% bibliography --group_by none --query @*[status=under_review]* %}

## Under Revision

{% bibliography --group_by none --query @*[status=under_revision]* %}

## Published

{% bibliography --query @*[status=published]* %}

</div>
