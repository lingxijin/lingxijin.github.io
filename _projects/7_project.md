---
layout: page
title: "Design and Evaluation of Recommender Systems for Educational Artificial Intelligence Platforms: Focusing on Preference-consistent and Preference-inconsistent Recommendation Methods"
description: "Recommender system"
img: assets/img/project7.png
importance: 1
category: work
---

최근 인공지능(AI) 기반 교육 플랫폼이 급격히 확대되면서 학습자들이 AI 기술을 이해하는 방식도 다양해지고 있다. 그러나 많은 AI 기반 플랫폼이 기술에 대한 정확한 정보를 제공하지 않거나, 기능을 추상적으로 서술하거나 과대포장하는 경향이 있어, 사용자들이 적절한 학습 도구를 선택하는 데 어려움을 겪고 있다. 이러한 문제를 해결하기 위해, 학습자의 개별적인 학습 특성과 필요에 맞는 콘텐츠를 추천할 수 있는 시스템이 필요하다. 본 연구는 학습자가 단순한 추천 시스템의 사용자가 아니라 정보 제공자의 역할도 수행하는 참여적 추천 매커니즘을 제안하는 것을 목표로 한다. 또한, 학습자의 기존 선호도를 반영한 ‘선호 일치(preference-consistent)’ 추천 방식과, 새로운 학습 기회를 제공할 수 있는 ‘선호 불일치(preference-inconsistent)’ 추천 방식을 적용하여 각 유형의 추천 방식이 학습 경험에 미치는 영향을 검증하고자 하였다.

## Recommender System Design Stages
<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid
      loading="eager"
      path="assets/img/project7.png"
      title="Proposed Recommender System Design Stages"
      class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption"></div>

---

## References
{% assign refs = "김령희2023학습양식,jin2023recommendation" | split: "," %}
<h2 class="mt-4">References</h2>
{% for r in refs %}
  {% bibliography --query @*[key={{ r }}] %}
{% endfor %}

