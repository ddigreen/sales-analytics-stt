# Existing systems: sales conversation analytics

**Method.** Desk research from official product and support pages, accessed **21 October 2026**. This is a capability comparison, not a hands-on accuracy or price benchmark. Four currently documented systems were selected because each connects spoken sales interactions with sales workflows. Salesloft explicitly announced general availability on 14 July 2026 [S1]. Current Gong, HubSpot, and Dynamics documentation describes active CI features [G1], [H1], [D1]. Feature availability depends on contract, seat, configuration, region, and language.

| Consistent criterion | Gong | Salesloft Conversation Intelligence | HubSpot Conversation Intelligence | Dynamics 365 Sales Conversation Intelligence |
|---|---|---|---|---|
| 1. Audio/conversation capture | Sales calls and meetings [G1] | Recorded customer calls; mobile in-person recording announced [S1] | HubSpot calling and supported third-party providers; conferencing integrations create meeting records [H1] | Teams phone calls and Teams meetings, with different integration paths [D1] |
| 2. Transcript review | Speaker-attributed transcript; keyword search and timestamp navigation [G2] | Recorded-call transcript and review page [S2] | Searchable transcript, speaker tracks, inline comments [H1] | Timeline, transcript, comments, playback and supported-language translation [D2] |
| 3. Link to structured sales data | CRM integration includes Salesforce, HubSpot and Dynamics 365 [G3] | Salesforce sync for recordings, summaries, metrics and tasks; official guide calls Salesforce the only fully supported CRM [S3] | Associations to contacts, companies, deals and tickets [H1] | Conversation summary and details logged to CRM records [D1] |
| 4. Content-derived insights | Topics, objections, competitor mentions, buying signals and summaries [G1] | Objections, sentiment, summaries and action items [S1] | Summary includes decisions, sentiment and next steps; tracked terms [H1] | Action items, brands, keywords, sentiment and questions; language-dependent [D3] |
| 5. Coaching workflow | Scorecards and coaching recommendations [G1] | Live coaching and automatic call scoring announced [S1] | Comments, shared excerpts and coaching playlists [H1] | Manager coaching and editable/shareable summaries [D1] |
| 6. Aggregate analytics | Team interaction statistics and tracker/topic analysis [G4] | Topic dashboards; cross-call trends announced [S4], [S1] | Call index filters; Enterprise tracked-term reporting [H1] | Manager dashboards, seller/team KPIs and competitor trends [D1], [D4] |
| 7. Relevant transcription languages | English, Russian and Kazakh listed [G5] | Russian listed in legacy Conversations transcript guide; Kazakh and equivalence to the newly unified CI product not verified [S5] | English, Russian and Kazakh listed for automatic call/meeting transcription [H2] | English listed; Russian and Kazakh not listed in the reviewed CI language table [D3] |
| 8. Access/configuration conditions | Foundation core license; additional applications and seats determine access [G6] | Admin configuration and feature flags apply to Topics; Smart Topics require Advanced AI Features [S4] | Professional/Enterprise Sales or Service seat for transcription analysis; Enterprise for tracked terms [H1] | Eligible Dynamics license and administrator setup; permissions and language/region constraints [D1], [D5] |

**Interpretation.** The common pattern is audio → transcript → extracted information → CRM context → coaching/reporting. Gong offers multiple CRM connectors; HubSpot and Dynamics closely connect CI to their own CRM records; Salesloft emphasizes seller actions and forecast context. These are product-design differences, not evidence that one produces better research results.

**Project implication.** The proposed contribution is a reproducible prototype that joins timestamped transcript evidence to imported sales records, exposes transparent KPI formulas, and evaluates Russian/Kazakh/mixed speech on a declared test set. Multilingual transcription by itself is not a defensible novelty claim: Gong and HubSpot already list Russian and Kazakh [G5], [H2]. An academic prototype can make model versions, annotated examples, errors, join rules, and evaluation procedures inspectable. This is a project objective; superiority over commercial systems has not been established.

**Evidence limitations.** Vendor claims were checked against current official pages, not tested in paid accounts. Salesloft's older landing page says six languages, while its April 2026 Conversations support page lists more; the later platform consolidation makes release-specific confirmation necessary [S5], [S6]. “Not listed/not verified” describes available evidence and must not be converted into “unsupported.” No vendor accuracy, ROI, or sentiment reliability claim is accepted as an independently measured finding.

[G1]: https://www.gong.io/conversation-intelligence "Gong: Conversation Intelligence"
[G2]: https://help.gong.io/docs/explore-call-content "Gong: Explore call content"
[G3]: https://help.gong.io/docs/crm-integrations "Gong: CRM integrations"
[G4]: https://help.gong.io/docs/en/analyze-team-performance "Gong: Analyze team performance"
[G5]: https://help.gong.io/docs/what-languages-are-supported-in-gong "Gong: About language support"
[G6]: https://help.gong.io/docs/plans-and-seats "Gong: Plans and seats"
[S1]: https://www.salesloft.com/company/newsroom/salesloft-conversation-intelligence "Salesloft: General availability announcement, 14 July 2026"
[S2]: https://help.salesloft.com/s/article/Conversation-Intelligence-Call-Review-Page-UI-Reference?language=en_US "Salesloft: Call Review Page UI Reference"
[S3]: https://help.salesloft.com/s/article/Integrate-Salesforce-with-Conversation-Intelligence?language=en_US "Salesloft: Salesforce integration"
[S4]: https://help.salesloft.com/s/article/Set-Up-Topics-and-Filters-in-Conversation-Intelligence?language=en_US "Salesloft: Topics and filters"
[S5]: https://help.salesloft.com/s/article/Conversations-Transcripts?language=en_US "Salesloft: Conversations Transcripts, 14 April 2026"
[S6]: https://www.salesloft.com/lp/conversational-intelligence "Salesloft: Conversational intelligence landing page"
[H1]: https://knowledge.hubspot.com/calling/review-call-recordings-and-transcripts "HubSpot: Review call recordings and transcripts"
[H2]: https://knowledge.hubspot.com/help-and-resources/hubspot-language-offerings "HubSpot: Language offerings"
[D1]: https://learn.microsoft.com/en-us/dynamics365/sales/faq-conversation-intelligence "Microsoft: Conversation intelligence FAQs"
[D2]: https://learn.microsoft.com/en-us/dynamics365/sales/view-and-understand-call-summary-sales-app "Microsoft: Call summary page"
[D3]: https://learn.microsoft.com/en-us/dynamics365/sales/language-support-conversation-intelligence "Microsoft: CI language support"
[D4]: https://learn.microsoft.com/en-us/dynamics365/sales/dynamics365-sales-insights-app-home-page "Microsoft: Overall sales and seller insights"
[D5]: https://learn.microsoft.com/en-us/dynamics365/sales/intro-admin-guide-sales-insights "Microsoft: Enable and configure Sales Insights"
