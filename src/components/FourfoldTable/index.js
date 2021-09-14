import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import AxisX from './AxisX'
import AxisY from './AxisY'
import {getPhenomenonUrl} from '../../helpers/contentCard'
import { requestTranslation } from '@sangre-fp/i18n';

// const requestTranslation = () => 'request Translation NN'
// const getPhenomenonUrl = (a, b) => 'http://google.comMM'

const NODE_RADIUS = 10
const SPECIAL_NODE_RADIUS = 6

const App = ({
  containerWidth = 500,
  containerHeight = 500,
  axisLabel3 = 'BottomLeft',
  axisLabel4 = 'BottomRight',
  axisLabel5 = 'TopLeft',
  axisLabel6 = 'TopRight',
  axisLabel1 = 'Horizontal Axis Default',
  axisLabel1a = 'Left End Default',
  axisLabel1b = 'Right End Default',
  axisLabel2 = 'Vertical Axis Default',
  axisLabel2a = 'Low End Default',
  axisLabel2b = 'High End Default',
  phenomena = [],
  radar
}) => {

//   const phenomena = [
//     {
//         "groups": [
//             0
//         ],
//         "id": "aa2ef169-bfbb-40fc-bbb3-762cbbe4a973",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1,
//         "updated_at": "2020-04-24T07:51:45.629Z",
//         "created_at": "2019-10-09T11:55:34.000Z",
//         "content": {
//             "type": "9c7a97a7-3650-45f9-9ab4-a489a5970506",
//             "title": "Value of Degrees 2.1",
//             "short_title": "Value of Degrees",
//             "summary": "<p>Traditionally, education has provided a direct way to improve social status, but this route of social mobility is gradually weakening. The value of degrees is constantly decreasing in the West, especially in the US, and more emphasis is given to different kinds of certificates and practically proven qualifications.</p>",
//             "body": "<h2>Background</h2><p>A report on the future of work by the World Economic Forum underlines that anticipating and managing expertise needs are becoming increasingly important. They estimate that up to 65 % of children starting their school this year will end up working in occupations and tasks that do not yet exist today. This rapid change is also showcased by the fact that many of the most hyped contemporary occupations and fields have been invented within the last ten years.</p><p>The core of many academic degrees is rapidly changing. For example, by the time of graduation, up to 50 % of information received in the first year of a four-year technical degree may have become outdated. The report also states that up to a third of the core competencies linked to most occupations may change by the year 2020. Artificial intelligence and robotics developments may completely replace some human occupations and to drastically alter tasks and jobs in practically all fields and industries within the next few decades.</p><p>The skills required for many professions have changed in a relatively short time and the pace of change is likely to quicken. Hence personal characteristics, practical experience, certificates and genuine, proven qualifications seem far more essential for employees than mere academic degrees.</p><h2>Impacts</h2><p>Rapid changes in professions and industries mean that degrees no longer match the skill requirements of the work markets and cannot ensure a successful professional career or even full-time employment.</p><p>Degree curricula need to be radically renewed increasingly often, if the goal of degrees is to meet the needs of societies, organisations, and individuals. If supply and demand do not genuinely meet, completing outdated and unnecessary degrees may prove expensive for societies and individuals alike. This development does not merely deal with renewing education of future generations: it is of paramount importance to invest into the further education and re-education of existing workforce.</p><p>In case degrees are replaced by certificates and practically proven qualifications, what happens to educational institutions, the teaching profession, university research, and academic general knowledge? Can we expect more nepotism in recruitment or limited social mobility? What kind of boundaries between social classes disappear and which ones strengthen?</p><h3>Additional Information</h3><ul><li>”The Future of Jobs”. World Economic Forum. <a href=\"http://reports.weforum.org/future-of-jobs-2016/\" rel=\"noopener noreferrer\" target=\"_blank\">http://reports.weforum.org/future-of-jobs-2016/</a></li><li>Rebecca Wilson, ”Work experience more important than degree level to graduate recruiters, finds research”. Recruitment International. <a href=\"https://www.recruitment-international.co.uk/blog/2016/11/work-experience-more-important-than-degree-level-to-graduate-recruiters-finds-research\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.recruitment-international.co.uk/blog/2016/11/work-experience-more-important-than-degree-level-to-graduate-recruiters-finds-research</a></li><li>Peyton Holland, ”Skills that pay the bills … and redefine success”. TEDx. <a href=\"https://www.youtube.com/watch?v=6OvVlkx69Ys\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.youtube.com/watch?v=6OvVlkx69Ys</a></li><li>Ilya Pozin, ”College Students: In the Real World, Your Degree Is Worthless”. Inc. <a href=\"http://www.inc.com/ilya-pozin/college-students-in-the-real-world-your-degree-is-worthless.html\" rel=\"noopener noreferrer\" target=\"_blank\">http://www.inc.com/ilya-pozin/college-students-in-the-real-world-your-degree-is-worthless.html</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/c2irSBECc-4?start=66",
//                 "image": "",
//                 "text": "The Future of Education Is Not What It Used to Be, Jack Delosa, TEDx"
//             },
//             "time_range": {
//                 "min": 2028,
//                 "max": 2040
//             },
//             "related_phenomena": [
//                 "10f45f48-5e25-428c-a37e-4b0b34cb6048",
//                 "4678aaf5-fafb-4b18-9f64-2eea9453d604",
//                 "39ae4ecd-56bb-496d-9d95-a2538f84b90f",
//                 "82b1845e-b869-414d-8449-af718dc9f560",
//                 "8895a693-f354-4a39-a225-0e4221b6d999",
//                 "91055d26-88de-4878-9018-8d43d2b43880",
//                 "84483045-08d4-48b9-a12f-36384a6b02f0",
//                 "ee3bada4-c9b4-49b6-9c5c-4c3d46fdb3d1"
//             ],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [],
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "cooling",
//         "content-type-title": "Weakening",
//         "color": "none",
//         "rating_x": {
//             "avg": "74.0000000000000000",
//             "median": 74,
//             "values": [
//                 74
//             ]
//         },
//         "rating_y": {
//             "avg": "100.0000000000000000",
//             "median": 100,
//             "values": [
//                 100
//             ]
//         },
//         "ratingCurrentY": 100,
//         "ratingCurrentX": 74
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "10f45f48-5e25-428c-a37e-4b0b34cb6048",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1924,
//         "updated_at": "2020-04-24T07:52:12.669Z",
//         "created_at": "2019-03-19T09:23:42.000Z",
//         "content": {
//             "type": "474ead6c-06c4-46a9-bf9f-258682108888",
//             "title": "Growing Rice in Salt Water",
//             "short_title": "Salt Water Rice",
//             "summary": "<p>Chinese scientists have managed to develop a strain of rice that can be grown in salt water. The invention could allow a significant amount of land, previously unsuitable for cultivating rice due to lack of fresh water, to be taken into agricultural use. Even though salt water rice is remarkably more expensive than traditional strains, it is still believed to have the potential of feeding hundreds of millions of people in the future. Besides China, also Dubai has taken great interest in the invention.</p>",
//             "body": "<h3>Additional Information</h3><ul><li>Carl Samson, ”China invents rice that can grow in salt water, can feed over 200 million people”. Next Shark. <a href=\"https://nextshark.com/china-invents-rice-can-grow-salt-water-can-feed-200-million-people/\" rel=\"noopener noreferrer\" target=\"_blank\">https://nextshark.com/china-invents-rice-can-grow-salt-water-can-feed-200-million-people/</a></li><li>Wu Yan, ”Chinese team succeeds in planting saltwater rice in Dubai’s desert”. China Daily. <a href=\"http://www.chinadaily.com.cn/a/201805/31/WS5b0fb51fa31001b82571d787.html\" rel=\"noopener noreferrer\" target=\"_blank\">http://www.chinadaily.com.cn/a/201805/31/WS5b0fb51fa31001b82571d787.html</a></li><li>Liu Caiyu, ”Dubai plans to expand Chinese saltwater rice into Arab world, Africa”. Global Times. <a href=\"http://www.globaltimes.cn/content/1112046.shtml\" rel=\"noopener noreferrer\" target=\"_blank\">http://www.globaltimes.cn/content/1112046.shtml</a></li><li>Brian Wang, ”Rice grown in desert, using seawater with over double the global average yields”. Next Big future. <a href=\"https://www.nextbigfuture.com/2018/06/rice-grown-in-desert-using-seawater-with-over-double-the-global-average-yields.html\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.nextbigfuture.com/2018/06/rice-grown-in-desert-using-seawater-with-over-double-the-global-average-yields.html</a></li></ul>",
//             "media": {
//                 "video": "https://www.youtube.com/embed/dtw7FW43k3k?start=3",
//                 "image": "",
//                 "text": "Chinese Scientists Create Saltwater-Resistant Rice, Global1 News Network"
//             },
//             "time_range": {
//                 "min": 2028,
//                 "max": 2040
//             },
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [],
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "weaksignal",
//         "content-type-title": "Weak signal",
//         "color": "none",
//         "rating_x": {
//             "avg": "97.0000000000000000",
//             "median": 97,
//             "values": [
//                 97
//             ]
//         },
//         "rating_y": {
//             "avg": "97.0000000000000000",
//             "median": 97,
//             "values": [
//                 97
//             ]
//         },
//         "ratingCurrentX": 97,
//         "ratingCurrentY": 97
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "978cf189-38df-41b3-acba-9aaf8b4c4ec9",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1924,
//         "created_by": 1924,
//         "updated_at": "2019-01-18T20:04:18.000Z",
//         "created_at": "2019-01-18T20:04:18.000Z",
//         "content": {
//             "type": "6528f835-0637-4dfb-8916-474b8053d68d",
//             "title": "Change in Automation, AI and Robotisation 2035",
//             "short_title": "Automation AI+Robo 2035",
//             "summary": "The development of AI will take several huge steps forward in 2030s. In addition to machine learning and AI, automation and robotics will increasingly utilise technologies related to deep learning. It is assumed that the most significant breakthroughs will take place in the robot traffic on roads and urban airspaces as well as in medicine. However, much of the progress will be unforeseeable meaning many developments and their social implications cannot be predicted.",
//             "body": "<p><br></p>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/TnUYcTuZJpM?start=17",
//                 "image": "",
//                 "text": "Google's Deep Mind Explained! - Self Learning A.I, ColdFusion"
//             },
//             "time_range": null,
//             "related_phenomena": [
//                 "86b943d7-3b17-460c-863d-5c8bddbc17a0",
//                 "42acf99d-1991-48d4-8354-36d92adb84ab",
//                 "65d13a47-cf78-470a-a371-3435395fa1d4",
//                 "0a0d537b-1982-406a-a6b1-a441a2f17c7f",
//                 "564aed22-fbe4-4b65-a445-295a60f503be",
//                 "fdc7079a-8fed-4205-bc3b-83acf00e60f4",
//                 "f93d691e-7242-4eed-befb-c565cbd0da4f",
//                 "d303964a-6b1f-492f-8199-23fc35ef9ffa",
//                 "03592b8c-95f2-4674-ab5a-3cc453c4a3e7",
//                 "6e76bd8f-a579-4cf3-ab28-286ca3135a8b",
//                 "decd5a11-56f5-4c69-b2d5-cb67b915d9b9",
//                 "da52dfc1-6aa5-479d-b70c-77613ff3228c",
//                 "ee3bada4-c9b4-49b6-9c5c-4c3d46fdb3d1",
//                 "180bd387-d904-4391-a01e-ae0fc1631666",
//                 "d6c82d2b-ceb9-4cff-975f-bb3dbd9a45e9",
//                 "1af243d9-e0ea-49bc-91fd-c47afe7f474b",
//                 "bffc3591-6587-48e7-b01c-65941807782c",
//                 "138a037c-9fc1-4236-86b4-41cd95d004e0",
//                 "39ae4ecd-56bb-496d-9d95-a2538f84b90f",
//                 "45fdba62-3326-4837-a7ee-bda68f12989a",
//                 "752f2a1f-c3ee-48ca-b62c-656cdf6d29eb",
//                 "32988a47-899d-48ab-8aee-02fca3720e81",
//                 "ca8c11ba-4f3f-43a3-a428-04571055ef5c",
//                 "b96876d3-71da-4392-be5d-c81e5f5ac231",
//                 "c1091109-a63d-4be5-b732-56d4cd44cb75",
//                 "83843f7f-956a-4b2b-bebf-a90173b5b678",
//                 "2f39300a-f4e2-4cf7-bcbb-852fdac6330e",
//                 "b3dd6b7e-5c12-4dd0-a0d8-f1b9728245aa",
//                 "91055d26-88de-4878-9018-8d43d2b43880",
//                 "4929b4e4-6e2a-4c5d-9198-b67bf224b5a0",
//                 "e2a69524-24a5-4098-baaa-f4b889014d2b",
//                 "e8be5e7c-9bbd-417e-abcd-ac690522cf37",
//                 "e38ed44d-adb7-4a5b-89a0-0c9b55ba85a6",
//                 "cecec135-687b-406f-baf8-1f3ed0639bb6",
//                 "8164e1fe-7179-49c4-8d0f-3087bc0a2a47",
//                 "5caa75ca-06e6-47bc-93a3-e517f666bbc4",
//                 "8895a693-f354-4a39-a225-0e4221b6d999",
//                 "a68f24a6-b015-44aa-aa16-d95a10624c55",
//                 "c0c8d5c0-6119-492d-a277-17e020d1171d",
//                 "f644fdf7-1178-436d-86f6-1df514ae18c2",
//                 "82028320-f297-4110-8eb4-24fbbc18aa11",
//                 "9d05354b-5998-4318-afde-31c6dd34d51f",
//                 "8f73555f-a9f9-4976-b20f-8f6489b87a05",
//                 "1e3b3274-3d03-49e7-bff3-8bc79a7925be",
//                 "c7a0a86b-5f10-4618-a42b-bda8d77b0a99",
//                 "a2ba49d4-6247-4bb7-be73-d51bcde998e4",
//                 "102a5893-9468-48b3-9efb-34b17ab26eba",
//                 "915369b6-5238-489e-95df-02d97732ed9e",
//                 "8e065d48-d330-48fd-aea4-376227bc687c",
//                 "6670a04c-0c9d-4c63-929a-40fc24acb234"
//             ],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": []
//         },
//         "tags": [],
//         "content-type-alias": "summary",
//         "content-type-title": "Summary",
//         "color": "none",
//         "rating_x": {
//             "avg": "91.0000000000000000",
//             "median": 91,
//             "values": [
//                 91
//             ]
//         },
//         "rating_y": {
//             "avg": "95.0000000000000000",
//             "median": 95,
//             "values": [
//                 95
//             ]
//         },
//         "ratingCurrentX": 91,
//         "ratingCurrentY": 95
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "15349216-6db4-4c51-ab73-e7f34837cfe4",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-10-22T12:35:26.000Z",
//         "created_at": "2018-10-22T12:35:26.000Z",
//         "content": {
//             "type": "bf127402-abbe-42e7-b3c5-a8e46c76cfb0",
//             "title": "Self-maintaining Buildings",
//             "short_title": "Self-maintaining Buildings",
//             "summary": "Bionics is slowly entering the sphere of construction techniques. In the future, it is possible that construction components or even whole buildings are no longer built, but planted and grown and linked to the surrounding ecosystem. The growth and renewal of such “living” buildings can be guided e.g. with moulds, casts, and fertilisers.\n",
//             "body": "<h2>Background</h2><p>The field studying replacement of physical materials, such as concrete, plastic, polystyrene, or glass with biomaterials is called bionics, biomimetics, or biomimicry, and it forms a very promising field for the future. Bionics gives us a reason to believe in self-maintaining buildings or even cities that grow, wholly or in part, autonomously from biomaterials. Self-maintaining and self-growing buildings are, in a way, alive and thus constantly changing.</p><p>The field has seen several breakthroughs and some inventions are already in use. For instance, a Finnish company has entered the market with a bacterial substance for concrete surfaces that hibernates as long as the surface remains intact but awakes if the surface is cracked and moisture enters the structure. If this is the case, the bacteria produce a chalk-like substance that fills the cracks and blocks further moisture from entering the structure. In the long run, however, the potential of bionics reaches far greater heights. As Rachel Armstrong demonstrates in the video link below, limestone can be guided to grow, for example, a new foundation for the city of Venice or in the shape of walls for new buildings.</p><h3>Additional Information</h3><ul><li>\"Self healing material\". Tech Inside. <a href=\"https://www.youtube.com/watch?v=hr_Lngw4aBk\" target=\"_blank\">https://www.youtube.com/watch?v=hr_Lngw4aBk</a></li><li>Rachel Armstrong, \"Architecture that repairs itself?\". TED. <a href=\"https://www.ted.com/talks/rachel_armstrong_architecture_that_repairs_itself\" target=\"_blank\">https://www.ted.com/talks/rachel_armstrong_architecture_that_repairs_itself</a></li><li>Matthew Trost, \"Q&amp;A with Bjarke Ingels: On architectural alchemy\". TED. <a href=\"http://blog.ted.com/2009/10/30/qa_with_bjarke/\" target=\"_blank\">http://blog.ted.com/2009/10/30/qa_with_bjarke/</a></li><li>\"Future Buildings\". Times Infinity. <a href=\"http://www.youtube.com/watch?v=wAeUd9XpZAE\" target=\"_blank\">http://www.youtube.com/watch?v=wAeUd9XpZAE</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/OXkW1q9HpFA?start=24",
//                 "image": "",
//                 "text": "Self-healing concrete containing bacteria, Hendrik Marius Jonkers, European Patent Office"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "3a086761-a68e-4221-a78d-a13b2bc0d6f1"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "wildcard",
//         "content-type-title": "Wild card",
//         "color": "none",
//         "rating_x": {
//             "avg": "87.0000000000000000",
//             "median": 87,
//             "values": [
//                 87
//             ]
//         },
//         "rating_y": {
//             "avg": "91.0000000000000000",
//             "median": 91,
//             "values": [
//                 91
//             ]
//         },
//         "ratingCurrentY": 91,
//         "ratingCurrentX": 87
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "b8687831-af0e-46b8-bcfb-2e1368a8f3ee",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1924,
//         "created_by": 1924,
//         "updated_at": "2019-01-07T07:58:16.000Z",
//         "created_at": "2019-01-07T07:58:16.000Z",
//         "content": {
//             "type": "bf127402-abbe-42e7-b3c5-a8e46c76cfb0",
//             "title": "Leased Standard of Living",
//             "short_title": "Leased Standard of Living",
//             "summary": "New kinds of business ecosystems aiming to create comprehensive customership, i.e. to incentivise or force customers to acquire all possible services from a single service platform, may in the future also offer housing and mobility services. In that case, a customer could get from one service provider, for example, a flat, cleaning service, and a car, which means that the entire standard of living and lifestyle would be leased: nothing is owned, but only rented. This could fundamentally change the whole notion of ownership and destroy the fundaments behind contemporary business logic.",
//             "body": "<h2>Background</h2><p>Business ecosystem aiming to create comprehensive customership may not limit their offerings to today’s mix of bundled up services and regular customer discounts. It is very well possible that some big actors will soon be able to create alliances and umbrella-like business ecosystems, which, for a monthly fee tied to the rent, offer genuinely many-sided deals.&nbsp;Besides everyday consumer goods, these deals could include travel, mobility, banking, insurance, healthcare, and housing services. Business alliances dedicated to a single ecosystem could bundle up all the different kinds of services and offer, for example, differently priced leasing packages for different kinds of customers. Say, a bronze level service package might include a low-priced rental car and a small flat, whereas a platinum level service with a far higher price tag could allow the customer to choose from a variety of luxurious options.</p><h3>Additional Information</h3><ul><li>Sarwant Singh, ”Can Vehicle Leasing Stay On Track As Subscription Models Hit The Fast Lane?”. Forbes. <a href=\"https://www.forbes.com/sites/sarwantsingh/2018/01/25/can-vehicle-leasing-last-the-course-as-subscription-models-hit-the-fast-lane/#48c75be64bfe\" target=\"_blank\">https://www.forbes.com/sites/sarwantsingh/2018/01/25/can-vehicle-leasing...</a></li><li>”Zibby - New Lease-To-Own Payment Option For Online Shopping”. Zibby. <a href=\"https://www.zibby.com/customers\" target=\"_blank\">https://www.zibby.com/customers</a></li><li>Zahra Bahrololoumi, ”Forget platforms: Business ecosystems are the future”. Accenture. <a href=\"https://www.accenture.com/gb-en/blogs/blogs-forget-platforms\" target=\"_blank\">https://www.accenture.com/gb-en/blogs/blogs-forget-platforms</a></li><li>Sunder Rajan, ”Build Your Business Ecosystem to Build Your Competitiveness”. Linkedin. <a href=\"https://www.linkedin.com/pulse/importance-business-ecosystems-building-sunder-rajan\" target=\"_blank\">https://www.linkedin.com/pulse/importance-business-ecosystems-building-sunder-rajan</a></li><li>Deepak Shyam, ”How companies are coping with evolving business ecosystems in a digital world”. Forbes India. <a href=\"http://www.forbesindia.com/article/weschool/how-companies-are-coping-with-evolving-business-ecosystems-in-a-digital-world/43683/1\" target=\"_blank\">http://www.forbesindia.com/article/weschool/how-companies-are-coping-with-evolving-business-ecosystems-in-a-digital-world/43683/1</a></li><li>Mihir Patkar, ”Apple vs. Android: Buy the Ecosystem, Not the Gadget”. MakeUseOf. <a href=\"http://www.makeuseof.com/tag/apple-vs-android-buy-ecosystem-not-gadget/\" target=\"_blank\">http://www.makeuseof.com/tag/apple-vs-android-buy-ecosystem-not-gadget/</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/UJ3Zjp1ssfs?start=10",
//                 "image": "",
//                 "text": "Fair is Disrupting the Car Buying Model by Offering an Alternative to Leasing and Buying, Fair"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "31694f31-9496-4f0b-92e5-348b8c3bb184"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "wildcard",
//         "content-type-title": "Wild card",
//         "color": "none",
//         "rating_x": {
//             "avg": "88.0000000000000000",
//             "median": 88,
//             "values": [
//                 88
//             ]
//         },
//         "rating_y": {
//             "avg": "90.0000000000000000",
//             "median": 90,
//             "values": [
//                 90
//             ]
//         },
//         "ratingCurrentX": 88,
//         "ratingCurrentY": 90
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "180bd387-d904-4391-a01e-ae0fc1631666",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1924,
//         "created_by": 1924,
//         "updated_at": "2018-10-23T13:35:46.000Z",
//         "created_at": "2018-10-23T13:35:46.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Industrial Revolution 4.0",
//             "short_title": "Industrial Revolution 4.0",
//             "summary": "The next essential revolution of our industries is just around the corner. The revolution is driven, amongst other things, by digitalisation, robotics, automation, artificial intelligence, the Internet of everything, biotechnology, and big data. We are dealing with a significant, wide systemic change where physical and biological systems interlink and essentially increase efficiency and productivity.\n",
//             "body": "<h2>Background</h2><p>The next industrial revolution has been called by some the 2nd industrial revolution, while others have named it Industrial revolution 4.0 (or industry 4.0). Describing this development as the second phase puts focus on the great impacts of this change. The next era of human societies is characterised by digitalisation, biotechnology, artificial intelligence, and the Internet of everything with its interlinked objects and devices. Key words include intelligence as well as smart, interconnected devices, people, and robotics. The number of breakthroughs is huge and the speed of change is exponential. This means that the change seems even more drastic than in previous industrial revolutions.</p><p>Industrial revolutions can be described as follows:</p><ul><li>1.0: steam powered production</li><li>2.0: electric devices, internal combustion engine, and assembly line</li><li>3.0: personal computing and automation</li><li>4.0: interconnected devices and machine-machine communication</li></ul><p>The vocabulary of the fourth industrial revolution include smart cities, smart buildings, intelligent workplaces, automated factories, and self-repairing devices. Our built environment will contain billions of tiny sensors that create and disseminate data and information and help us in our daily tasks. Decision-making can be based on real-time data. Platforms, sharing economy, mass customisation, and cloud services are the norm, as are different kinds of disruption (consider Uber) and the circular economy. The new industrial revolution is also characterised by continuous networked debate, AI and robot co-workers, autonomous vehicles and flying devices, platforms, and synthetic biology, to name a few things. What we are dealing with is first and foremost a combination of innovation and breakthroughs, whose final impacts are difficult or impossible to anticipate. The fourth industrial revolution does not merely change what we do and how, but it also changes us as a species.</p><h2>Recent Developments</h2><p>California-based Drive.ai has successfully tested a driverless car on a public road in Texas. For its part, Starsky Robotics has announced that its driverless truck drove seven miles of a public, if however rural, road without problems. Even though self-driving cars are believed to be several years away, technology may develop considerably faster than expected thanks to successes like those mentioned above.</p><p>Splunk Industrial Asset Intelligence (IAI), created by the US-based Splunk Enterprise, is a real-time analytics solution aimed at the oil and gas industry, logistics, and the energy business. Splunk IAI continually monitors the data delivered by the industrial IoT, helping the customers to ensure that the systems are working at full capacity. The use of data, made central by the fourth industrial revolution, is bringing more and more tools like the Splunk IAI to the market, and integrating these tools to production will become an area of fierce competition.</p><p>There is an attempt to create a sense of smell for an AI so that it can detect various diseases from human breath. Even though the ability to analyse small airborne particles has existed for a long time, the introduction of the AI makes the analysis both quicker and more accurate, making it useful in examining various substances.</p><p>Claroty focuses on creating cybersecurity solutions for industrial digital infrastructure. As the industrial IoT becomes more widespread, and the cybersecurity challenges increase, the demand for companies like Claroty is going to grow. Claroty was able to acquire funding of 60 million dollars from investors indicating the growing interest the field attracts.</p><p>The Korean firm Jenax is developing a flexible battery. The shape of the battery is customisable, making its use possible, e.g., in wearable technology and sensors. The flexibility of the battery makes the work of designers easier as they are released from some of the limitations of conventional batteries.</p><h2>Forecasts</h2><ul><li><a href=\"https://www.ericsson.com/en/mobility-report/internet-of-things-forecast\" target=\"_blank\">Ericsson:</a>&nbsp;\"The number of IoT-devices is forecasted to reach 1.5 billion by 2022.\"</li><li><a href=\"https://www.psmarketresearch.com/market-analysis/ai-in-transportation-market\" target=\"_blank\">P&amp;S Market Research:</a>&nbsp;\"The global AI in the transportation market is predicted to reach $3.5 billion by 2023, registering a CAGR of 16.5% during 2018–2023.\"</li><li><a href=\"https://www.marketresearchfuture.com/reports/industrial-cyber-security-market-4408\" target=\"_blank\">Market Research Future:</a>&nbsp;\"The industrial cyber security market is forecasted to reach c. $24.41 billion by the end of 2023, with 10,97% CAGR.\"</li></ul><h3>Additional Information</h3><ul><li>Andrew J. Hawkins, ”Fully driverless cars are on public roads in Texas”. The Verge. <a href=\"https://www.theverge.com/2018/5/17/17365188/drive-ai-driverless-self-driving-car-texas\" target=\"_blank\">https://www.theverge.com/2018/5/17/17365188/drive-ai-driverless-self-dri...</a></li><li>”Starsky Robotics' Unmanned Truck Drives on Public Road in Florida”. Transport Topics. <a href=\"https://www.ttnews.com/articles/starsky-robotics-unmanned-truck-drives-public-road-florida\" target=\"_blank\">https://www.ttnews.com/articles/starsky-robotics-unmanned-truck-drives-p...</a></li><li>Natalie Gagliordi, ”Splunk intros IoT platform for industrial operations”. ZDNet. <a href=\"https://www.zdnet.com/article/splunk-intros-iot-platform-for-industrial-operations/\" target=\"_blank\">https://www.zdnet.com/article/splunk-intros-iot-platform-for-industrial-...</a></li><li>Andrea Soltoggio, ”AI is acquiring a sense of smell that can detect illnesses in human breath”. Independent. <a href=\"https://www.independent.co.uk/news/science/ai-artificial-intelligence-smell-detect-illness-science-technology-a8394706.html\" target=\"_blank\">https://www.independent.co.uk/news/science/ai-artificial-intelligence-sm...</a></li><li>Dean Takahashi, ”Claroty raises $60 million to build cybersecurity for industrial networks”. VentureBeat. <a href=\"https://venturebeat.com/2018/06/11/claroty-raises-60-million-to-build-cybersecurity-for-industrial-networks/\" target=\"_blank\">https://venturebeat.com/2018/06/11/claroty-raises-60-million-to-build-cy...</a></li><li>Ma Si, ”Industrial cybersecurity a 'high priority'”. China Daily. <a href=\"http://www.chinadaily.com.cn/a/201805/25/WS5b0756dea31001b82571c30d.html\" target=\"_blank\">http://www.chinadaily.com.cn/a/201805/25/WS5b0756dea31001b82571c30d.html</a></li><li>Sam Draper, ”Jenax Will Exhibit World’s First Truly Flexible Battery at Wearable Technologies 2018 San Francisco”. WT | Wearable Technologies. <a href=\"https://www.wearable-technologies.com/2018/07/jenax-will-exhibit-worlds-first-truly-flexible-battery-at-wearable-technologies-2018-san-francisco/\" target=\"_blank\">https://www.wearable-technologies.com/2018/07/jenax-will-exhibit-worlds-...</a></li><li>”Industry 4.0: What's in store in the Fourth Industrial Revolution”. INTHEBLACK. <a href=\"https://www.intheblack.com/articles/2017/09/01/digital-fourth-industrial-revolution\" target=\"_blank\">https://www.intheblack.com/articles/2017/09/01/digital-fourth-industrial...</a></li><li>Klaus Schwab, \"The Fourth Industrial Revolution: what it means, how to respond\". World Economic Forum. <a href=\"https://www.weforum.org/agenda/2016/01/the-fourth-industrial-revolution-what-it-means-and-how-to-respond/\" target=\"_blank\">https://www.weforum.org/agenda/2016/01/the-fourth-industrial-revolution-...</a></li><li>Markus Lorenz, ”Industry 4.0: how intelligent machines will transform everything we know”. TED Institute. <a href=\"https://www.youtube.com/watch?v=uBZmJOHIN8E\" target=\"_blank\">https://www.youtube.com/watch?v=uBZmJOHIN8E</a></li><li>Ritika Shah, ”Industrial Revolution 2.0? Experts debate robotic threat to jobs”. CNBC. <a href=\"http://www.cnbc.com/2015/12/11/robots-a-threat-to-white-and-blue-collar-jobs.html\" target=\"_blank\">http://www.cnbc.com/2015/12/11/robots-a-threat-to-white-and-blue-collar-...</a></li><li>\"Davos: How to master the next industrial revolution\". CNN. <a href=\"http://money.cnn.com/video/news/economy/2016/01/19/davos-klaus-schwab-fourth-industrial-revolution.cnnmoney/\" target=\"_blank\">http://money.cnn.com/video/news/economy/2016/01/19/davos-klaus-schwab-fo...</a></li><li>Emma Birnbaum, \"The Industrial Revolution 2.0\". David Birnbaum’s Blog. <a href=\"http://www.birnbaumgarment.com/2016/05/17/the-industrial-revolution-2-0-by-emma-birnbaum/\" target=\"_blank\">http://www.birnbaumgarment.com/2016/05/17/the-industrial-revolution-2-0-...</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/khjY5LWF3tg?start=71",
//                 "image": "",
//                 "text": "The Fourth Industrial Revolution, World Economic Forum"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "05c574fa-5ac5-4d02-8fda-b6ecb11f67d8"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "87.0000000000000000",
//             "median": 87,
//             "values": [
//                 87
//             ]
//         },
//         "rating_y": {
//             "avg": "89.0000000000000000",
//             "median": 89,
//             "values": [
//                 89
//             ]
//         },
//         "ratingCurrentY": 89,
//         "ratingCurrentX": 87
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "38de4659-201e-48a8-a18e-8921e1062ad8",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-09-11T09:59:03.000Z",
//         "created_at": "2018-09-11T09:59:03.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Underground Construction",
//             "short_title": "Underground Construction",
//             "summary": "The growth in the construction of underground tunnels shopping centres continues globally in the future. New forms of underground construction include housing and office buildings.",
//             "body": "<h2>Background</h2><p>Currently the largest underground shopping centres complexes are the Path in Toronto with its 371 600 square metres of space, Réso in Montreal, downtown Singapore, and a Japanese network of 76 tunnels. All global metropoles will see an increase in tunnel and shopping centre construction. Some cities, such as Singapore, have already decided its high time to start three-dimensional city planning. The rapidly growing population of Singapore, a city with half the surface area of London, is forced to take underground spaces into consideration in zoning activities instead of merely growing upwards or spreading out to the sea.</p><p>On the global level this development means that the market of tunnel boring and drilling equipment can expect an annual growth of 5.6 %. The market for machinery and equipment used in mining is expected to grow at a speed of 8.4 % per year.</p><h3>Additional Information</h3><ul><li>Timothy Misr, \"Singapore looks underground for room to grow\". Citiscope. <a href=\"http://citiscope.org/story/2015/singapore-looks-underground-room-grow\" target=\"_blank\">http://citiscope.org/story/2015/singapore-looks-underground-room-grow</a></li><li>\"The Global Tunneling and Drilling Equipment Market – Key Trends and Opportunities to 2018\". Market Research Store. <a href=\"http://www.marketresearchstore.com/report/the-global-tunneling-and-drilling-equipment-market-4645\" target=\"_blank\">http://www.marketresearchstore.com/report/the-global-tunneling-and-drilling-equipment-market-4645</a></li><li>\"Construction Equipment Market by Construction Equipment Type, Construction Application, Mining Equipment, by Mining Application, and Region (Asia-Pacific, North America, Europe, and ROW) - Global Trends and Forecast to 2021\". Markets and markets. <a href=\"http://www.marketsandmarkets.com/Market-Reports/construction-mining-equipment-market-179948937.html\" target=\"_blank\">http://www.marketsandmarkets.com/Market-Reports/construction-mining-equipment-market-179948937.html</a></li><li>Ziwei, Zhao &amp; Qi, Cao (2011). The Development of Urban Underground Space from the Perspective of Urban Economy. International Conference on Green Buildings and Sustainable Cities. Procedia Engineering (21), 767–770.</li></ul>",
//             "media": {
//                 "video": "https://www.youtube.com/embed/kWPNp-a4nIw",
//                 "image": "",
//                 "text": "Amazing Underground Homes, V-talk"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "a97550cf-00ef-4727-8a36-d90f0fd69cad"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "85.0000000000000000",
//             "median": 85,
//             "values": [
//                 85
//             ]
//         },
//         "rating_y": {
//             "avg": "89.0000000000000000",
//             "median": 89,
//             "values": [
//                 89
//             ]
//         },
//         "ratingCurrentX": 85,
//         "ratingCurrentY": 89
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "eef07f70-82e0-48de-9a1f-bfab6a6562e6",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2019-01-11T18:59:50.000Z",
//         "created_at": "2019-01-11T18:59:50.000Z",
//         "content": {
//             "type": "bf127402-abbe-42e7-b3c5-a8e46c76cfb0",
//             "title": "City-States",
//             "short_title": "City-States",
//             "summary": "As the megacities constitute an ever-growing share of the global economic activity, it is possible that some of them will strive to become independent states. For example, the desire to avoid funding the less developed parts of the country can form the basis for the drive toward independence. National policies perceived as harmful to the city may also act as contributing factors in the background.",
//             "body": "<h2>Background</h2><p>Nation states and federations in particular are historically speaking quite a new innovation. Before nation states, areas were controlled and managed by local counts and kings and even earlier by tribal chiefs. The first blooming cities were often independent and where ancient Greek cities were concerned, they were even democratically led.</p><p>Today there are ca. 130 cities in China alone with more than a million inhabitants. The number of actual megacities may very well exceed 40. The combined economic significance of these cities has been estimated to be reasonably higher than the economic importance of all the world’s 200+ nations combined if the megacities’ weight is not included in the calculations. Taken into consideration that urbanisation is an on-going and accelerating process, we can estimate that over 70 % of the world population lives in megacities by 2050. Furthermore, the value systems of people living in large metropoles often significantly differ from those of the rest of the population, and thus it is relatively reasonable to expect declarations of independence from metropoles at some point in time.</p><p>London is the first megacity where demands of independence have been voiced out loud.</p><h3>Additional Information</h3><ul><li>\"London&nbsp;independence\". Wikipedia. <a href=\"https://go2.futuresplatform.com/%E2%80%8Bhttps://en.wikipedia.org/wiki/London_independence\" target=\"_blank\">​https://en.wikipedia.org/wiki/London_independence</a></li><li>”NYC Mayor Bill de Blasio's Promise to ALL New Yorkers”. NYC Mayor's Office. <a href=\"https://youtu.be/WZwz5h-l6mI\" target=\"_blank\">https://youtu.be/WZwz5h-l6mI</a></li><li>Ana Swanson, \"Six maps that will make you rethink the world\". The Washington Post. <a href=\"https://www.washingtonpost.com/news/wonk/wp/2016/04/29/six-maps-that-will-make-you-rethink-the-world/\" target=\"_blank\">https://www.washingtonpost.com/news/wonk/wp/2016/04/29/six-maps-that-will-make-you-rethink-the-world/</a></li><li>James O'Malley, \"Declare London independent from the UK and apply to join the EU\". Change.org. <a href=\"https://www.change.org/p/sadiq-khan-declare-london-independent-from-the-uk-and-apply-to-join-the-eu\" target=\"_blank\">https://www.change.org/p/sadiq-khan-declare-london-independent-from-the-uk-and-apply-to-join-the-eu</a></li><li>Melissa Etehad, \"Mayor Sadiq Khan demands more autonomy for London after Brexit vote\". The Washington Post. <a href=\"https://www.washingtonpost.com/news/worldviews/wp/2016/06/24/londoners-want-their-own-independence-after-brexit-result/\" target=\"_blank\">https://www.washingtonpost.com/news/worldviews/wp/2016/06/24/londoners-want-their-own-independence-after-brexit-result/</a></li><li>Cori Faife, \"The Rebirth of the City-State\". How We Get To Next. <a href=\"https://howwegettonext.com/the-rebirth-of-the-city-state-1d005f7c4eb7#.nv25ekgx0\" target=\"_blank\">https://howwegettonext.com/the-rebirth-of-the-city-state-1d005f7c4eb7#.nv25ekgx0</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/zzG7cURdz7Q?start=47",
//                 "image": "",
//                 "text": "Londoner petitions to keep city in EU, James O'Malley, CBC News"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "1f7bb4e8-11a2-4564-9e5d-e0259f56921f"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "wildcard",
//         "content-type-title": "Wild card",
//         "color": "none",
//         "rating_x": {
//             "avg": "82.0000000000000000",
//             "median": 82,
//             "values": [
//                 82
//             ]
//         },
//         "rating_y": {
//             "avg": "89.0000000000000000",
//             "median": 89,
//             "values": [
//                 89
//             ]
//         },
//         "ratingCurrentX": 82,
//         "ratingCurrentY": 89
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "be1ba4e5-2dec-4d6f-9462-be3841af4c70",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-11-10T09:34:01.000Z",
//         "created_at": "2018-11-10T09:34:01.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Ageing World Population",
//             "short_title": "Ageing Population",
//             "summary": "The world population is ageing, as the age cohort of over 60 is the most rapidly growing group in almost all countries. The change in age distribution is based on increasing life expectancy and decreasing birthrates.\n",
//             "body": "<h2>Background</h2><p>Changing age distribution patterns caused by medical advancements, improved conditions, and lowering birth rates are a topical issue all around the world. People born today or in the future will live considerable longer lives than earlier generations.</p><p>The ageing of the population takes place fastest in the West, where the life expectancy of a newborn is already close to 100 years. Significant progress in, for example, cancer treatments, gene therapy, and organ printing can expand the expected lifespan even further.</p><p>According to WHO, there will be more people over the age of 60 than there are children under 5 in 2020. Currently the 60+ age cohort form roughly 12 % of the world population. That share is estimated to double by 2050. The rapid ageing of the population brings about a number of social challenges, some of which are already topical in many countries. These countries have been forced to extend careers and raise the retirement age in order to maintain an adequate dependency ratio.</p><h3>Additional Information</h3><ul><li>\"World report on ageing and health\". World Health Organization. <a href=\"http://www.who.int/ageing/events/world-report-2015-launch/en/\" target=\"_blank\">http://www.who.int/ageing/events/world-report-2015-launch/en/</a></li><li>”The World's Ageing Population”. AFP. <a href=\"https://youtu.be/rz9sQoNpc-Q\" target=\"_blank\">https://youtu.be/rz9sQoNpc-Q</a></li><li>\"Interactive Data - Profiles of Ageing 2017\". United Nations. <a href=\"https://population.un.org/ProfilesOfAgeing2017/index.html\" target=\"_blank\">https://population.un.org/ProfilesOfAgeing2017/index.html</a></li><li>\"World Population Ageing 2017 report\". United Nations. <a href=\"http://www.un.org/en/development/desa/population/publications/pdf/ageing/WPA2017_Report.pdf\" target=\"_blank\">http://www.un.org/en/development/desa/population/publications/pdf/ageing/WPA2017_Report.pdf</a></li><li>\"Older People\". The Guardian. <a href=\"http://www.guardian.co.uk/society/older-people\" target=\"_blank\">http://www.guardian.co.uk/society/older-people</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/x4r0S5qoIXc?start=7",
//                 "image": "",
//                 "text": "How an Ageing Population Will Change the World, BBC News"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "536dbcb7-98e1-475d-87d1-942dcc396d35"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "87.0000000000000000",
//             "median": 87,
//             "values": [
//                 87
//             ]
//         },
//         "rating_y": {
//             "avg": "88.0000000000000000",
//             "median": 88,
//             "values": [
//                 88
//             ]
//         },
//         "ratingCurrentX": 87,
//         "ratingCurrentY": 88
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "964f7c56-5d0c-44d0-87f7-036605424f6c",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1924,
//         "created_by": 1924,
//         "updated_at": "2019-02-16T17:39:42.000Z",
//         "created_at": "2019-02-16T17:39:42.000Z",
//         "content": {
//             "type": "bf127402-abbe-42e7-b3c5-a8e46c76cfb0",
//             "title": "Data Security of Human Body Under Threat",
//             "short_title": "Data Security of Body",
//             "summary": "In the future, more and more technology may be implanted into the human body. For this reason, firewall and virus protection for body-implanted electronics could become critical infrastructure development objectives.",
//             "body": "<h2>Background</h2><p>We no longer seem to be able to live without mobile phones or the Internet, both things that were mere science fiction only some years ago. It is possible as well that the health data measuring and recording devices, and other (cyborg) technologies inserted or implanted into our bodies and their communication abilities with our built environment and the whole sphere of the Internet become so common that we cannot live without them.</p><p>It is also possible that crackers and those spreading malicious software could start targeting implanted technology and data recorded on sub-skin microchips. For example, insurance companies, creditors, and recruiters could monitor individuals’ health data from a distance, or such data could be systematically tampered with or destroyed.</p><p>For these reasons, there is a possibility, that the management of the human body related information security risks will become increasingly important. For example, the researchers at the University of Toronto have developed a filter that prevents the automated facial recognition software from identifying persons in a photo. Although the filter is only applicable to photographs, it is a sign of a growing desire to secure one’s privacy, identity and information in a society in which almost everything will soon be connected to the internet.</p><h3>Additional Information</h3><ul><li>Dan Robitzski, “This filter makes your photos indechiperable to facial recognition software”. Futurism. <a href=\"https://futurism.com/filter-photos-facial-recognition-software?fbclid=IwAR1HW7_WqPd3LvpTcA2_jR_bJ1wEH8W0GakwoL0MYJcxhaGB7SQeAXIq-5U\" target=\"_blank\">https://futurism.com/filter-photos-facial-recognition-software?fbclid=IwAR1HW7_WqPd3LvpTcA2_jR_bJ1wEH8W0GakwoL0MYJcxhaGB7SQeAXIq-5U</a></li><li>”Hackers can get into your phone by faking your iris”. Now This. <a href=\"https://youtu.be/lqClBQooMNw\" target=\"_blank\">https://youtu.be/lqClBQooMNw</a></li><li>Harold Brubaker, ”Wearable tech gaining in health care, but privacy is a concern”. Philadelphia Media Network. <a href=\"http://www.philly.com/philly/business/Wearable-tech-gaining-in-health-care-but-what-about-privacy.html\" target=\"_blank\">http://www.philly.com/philly/business/Wearable-tech-gaining-in-health-care-but-what-about-privacy.html</a></li><li>Kirk J. Nahra, ”The Top Ten Health Care Privacy and Security Concerns for 2017”. Bloomberg BNA. <a href=\"https://www.bna.com/top-ten-health-n73014449230/\" target=\"_blank\">https://www.bna.com/top-ten-health-n73014449230/</a></li><li>”Protecting patient health and privacy from cyber threats”. Vector. <a href=\"https://www.vectranetworks.com/assets/protecting-patient-health-and-privacy.pdf\" target=\"_blank\">https://www.vectranetworks.com/assets/protecting-patient-health-and-privacy.pdf</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/UTc131UnZSA?start=10",
//                 "image": "",
//                 "text": "Top 10 Technologies That INVADE Your Privacy, TopTenz"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "7f3def13-ce16-4b5b-a5f4-a23a5b5587e7"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "wildcard",
//         "content-type-title": "Wild card",
//         "color": "none",
//         "rating_x": {
//             "avg": "89.0000000000000000",
//             "median": 89,
//             "values": [
//                 89
//             ]
//         },
//         "rating_y": {
//             "avg": "86.0000000000000000",
//             "median": 86,
//             "values": [
//                 86
//             ]
//         },
//         "ratingCurrentX": 89,
//         "ratingCurrentY": 86
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "6b8ffc11-0d05-47f9-b381-634df5a259b4",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-08-02T08:21:19.000Z",
//         "created_at": "2018-08-02T08:21:19.000Z",
//         "content": {
//             "type": "bf127402-abbe-42e7-b3c5-a8e46c76cfb0",
//             "title": "Technology-free Zones",
//             "short_title": "Technology-free Zones",
//             "summary": "It is well possible that technology-free zones are founded in the near future to counterbalance the digitalisation of our built environment. If such areas gain popularity, they can turn into a steady phenomenon that gives rise to a larger societal movement.\n",
//             "body": "<h2>Background</h2><p>Perhaps the best known group that decides to live without technology developed since the 19th century is the Amish. They do not oppose progress in medicine or science per se. Their anti-technological ideology mainly means shying away from mechanical devices. Unlike many other groups, the Amish eagerly take part in vaccinations and even genetic research.</p><p>The constantly accelerating pace of technological development coupled with haste and continuous change cause anxiety and depression in more and more people. Many long for a time where all things had their appropriate time and place, change was manageable, and every day was not filled with learning new things or trying to forget outdated practises. In the future, technological development and the renewal pace of knowledge only accelerate. It is little surprise that the popularity of e.g. slow life, downshifting, quiet spaces, retreats, and meditation is constantly rising.</p><h3>Additional Information</h3><ul><li>Jessica Dolcourt, ”No tech allowed! Your gadgets aren't welcome here”. CNET. <a href=\"https://www.cnet.com/news/no-tech-allowed-tech-free-zones-for-digital-detoxification/\" target=\"_blank\">https://www.cnet.com/news/no-tech-allowed-tech-free-zones-for-digital-detoxification/</a></li><li>\"Tech-free zones enjoyed by tourists\". News Limited. <a href=\"http://www.news.com.au/travel/news/study-into-connectivity-dead-zones/story-e6frfq80-1226486949028\" target=\"_blank\">http://www.news.com.au/travel/news/study-into-connectivity-dead-zones/story-e6frfq80-1226486949028</a></li><li>\"Meet the Amish – Taste of the high life\". Discern4Media. <a href=\"http://www.youtube.com/watch?v=VzKZFjdy4uk\" target=\"_blank\">http://www.youtube.com/watch?v=VzKZFjdy4uk</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/0QbcG7a80Dk?start=3",
//                 "image": "",
//                 "text": "Digital detox - the art of switching off, BBC Newsnight"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "e59ce975-ce37-4492-b630-e381e6dccb6a"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "wildcard",
//         "content-type-title": "Wild card",
//         "color": "none",
//         "rating_x": {
//             "avg": "83.0000000000000000",
//             "median": 83,
//             "values": [
//                 83
//             ]
//         },
//         "rating_y": {
//             "avg": "86.0000000000000000",
//             "median": 86,
//             "values": [
//                 86
//             ]
//         },
//         "ratingCurrentY": 86,
//         "ratingCurrentX": 83
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "273e4c15-5e07-43f4-96a2-2f5c28b89f17",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2019-02-18T09:02:16.000Z",
//         "created_at": "2019-02-18T09:02:16.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Teaching and Learning 2.0",
//             "short_title": "Teaching+ Learning 2.0",
//             "summary": "The rapidly changing and insecure operational environments of the globalizing world pose new kind of challenges for education. Changes in teaching methodology are also strongly linked to technological development, which essentially changes future competence requirements as well as alters learning tools, methods, and environments.",
//             "body": "<h2>Background</h2><p>As information production becomes automated and as repetitive work is conducted by robots, many professions will be redefined or cease to exist. In the future, the role of humans is expected to be particularly essential in tasks requiring creativity, ingenuity, or flexibility. Many current teaching and assessment models are criticised for encouraging mere memorisation, search for a single correct answer, and avoidance of mistakes.</p><p>This is about to change, since new teaching methods aim to support learning increasingly strongly through experimentation and practical tasks. One essential issue is that different forms of intelligence and talent are accepted as such and more individualised learning paths and methods are approved. The key words of new teaching methods include, amongst others, phenomenon-based learning, active engagement, peer learning, telelearning, and self-learning.</p><p>Besides future competence needs, technology advancement also has a significant impact on tools and equipment that can be utilised in further developing teaching or professional skills in the future. A variety of technologies enable multiple simultaneous means of presence: physical, virtual, social, and mobile. Increasing smartness and mediation of our built environment also bring about new opportunities to widen and develop learning environments.</p><h2>Impacts</h2><p>Pressures to renew public and private education systems are building up. The roles of teachers and classrooms will drastically change as new teaching methods are adopted. Teacher will more and more become sparring partners, directors, and builders of interest. Learning takes place regardless of location or time, and increasing amounts of courses are available for all interested parties. Opportunities for self-learning and peer learning significantly improve, reducing the value of official degrees and diplomas.</p><h3>Additional Information</h3><ul><li>Alex Gray, ”The 10 skills you need to thrive in the Fourth Industrial Revolution”. World Economic Forum. <a href=\"https://www.weforum.org/agenda/2016/01/the-10-skills-you-need-to-thrive-in-the-fourth-industrial-revolution/\" target=\"_blank\">https://www.weforum.org/agenda/2016/01/the-10-skills-you-need-to-thrive-in-the-fourth-industrial-revolution/</a></li><li>Devin Fidler, ”Future Skills: Update and Literature Review”. Institute for the Future, ACT Foundation &amp; The Joyce Foundation. <a href=\"http://www.iftf.org/fileadmin/user_upload/downloads/wfi/ACTF_IFTF_FutureSkills-report.pdf\" target=\"_blank\">http://www.iftf.org/fileadmin/user_upload/downloads/wfi/ACTF_IFTF_FutureSkills-report.pdf</a></li><li>”Humans Need Not Apply”. CGP Grey. <a href=\"https://www.youtube.com/watch?v=7Pq-S557XQU\" target=\"_blank\">https://www.youtube.com/watch?v=7Pq-S557XQU</a></li><li>”The Future of Education Can Be Found Within This AR Tablet”. Virtuality/ Futurism. <a href=\"https://futurism.com/videos/the-future-of-education-can-be-found-within-this-ar-tablet/\" target=\"_blank\">https://futurism.com/videos/the-future-of-education-can-be-found-within-this-ar-tablet/</a></li><li>\"By 2030 students will be learning from robot teachers 10 times faster than today\". Wolrd Economic Forum. <a href=\"https://www.facebook.com/worldeconomicforum/videos/10154293800866479/\" target=\"_blank\">https://www.facebook.com/worldeconomicforum/videos/10154293800866479/</a></li><li>”Episode 3 – Future Education – Professionals of the Future”. DNA Business. <a href=\"https://www.youtube.com/watch?v=7Z6fmIyG27I\" target=\"_blank\">https://www.youtube.com/watch?v=7Z6fmIyG27I</a></li><li>”5 Technologies That Will Change Classroom Education”. AJ+. <a href=\"https://www.youtube.com/watch?v=loFL5gT_m8I\" target=\"_blank\">https://www.youtube.com/watch?v=loFL5gT_m8I</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/fAb9PMs8bEg?start=182",
//                 "image": "",
//                 "text": "The Need For A New Model In Education, Sir Ken Robinson, Atlantic Rim Collaboratory"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "40bf5048-ca14-4356-b306-ff7a25ec2639"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "85.0000000000000000",
//             "median": 85,
//             "values": [
//                 85
//             ]
//         },
//         "rating_y": {
//             "avg": "85.0000000000000000",
//             "median": 85,
//             "values": [
//                 85
//             ]
//         },
//         "ratingCurrentX": 85,
//         "ratingCurrentY": 85
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "8895a693-f354-4a39-a225-0e4221b6d999",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1924,
//         "updated_at": "2020-04-24T08:25:24.333Z",
//         "created_at": "2019-03-19T06:44:24.000Z",
//         "content": {
//             "type": "9c7a97a7-3650-45f9-9ab4-a489a5970506",
//             "title": "Parking",
//             "short_title": "Parking",
//             "summary": "<p>In the future, autonomous vehicles are constantly available all around our cities. Self-driving cars require hardly any parking space.</p>",
//             "body": "<h2>Background</h2><p>According to existing plans, our future taxi traffic is based on constantly operating autonomous vehicles that only stop for a longer period of time for recharging or servicing. Currently our cars stand still 96 % of the time, but in the future parking space is not needed on city streets, parking houses, or our homes.</p><p>Nearly all major car manufacturers aim to become future market leaders. For example, Ford has announced it aims to bring the first fully autonomous shared vehicles (or taxis) to the market by the year 2021. To reach that goal, the company has doubled its personnel in its Silicon Valley R&amp;D team.</p><h2>Impacts</h2><p>This transformation of mobility saves urban space massively and it should already be considered in zoning, urban planning, architecture, etc. Some of our current parking spaces will turn into stops where we get on and off the autonomous vehicles. Perhaps traffic jams on the highway are replaced with queues in these intersections between pedestrian and vehicle traffic.</p><h3>Additional Information</h3><ul><li>\"Autonomous Cars Are Coming And You Can’t Have One\".HowStuffWorks. <a href=\"https://youtu.be/RsftP3_g89U?t=17s\" rel=\"noopener noreferrer\" target=\"_blank\">https://youtu.be/RsftP3_g89U?t=17s</a></li><li>\"Ford Targets Fully Autonomous Vehicle for Ride Sharing in 2021; Invests in New Tech Companies, Doubles Silicon Valley Team\". The Ford Motor Company. <a href=\"https://media.ford.com/content/fordmedia/fna/us/en/news/2016/08/16/ford-targets-fully-autonomous-vehicle-for-ride-sharing-in-2021.html\" rel=\"noopener noreferrer\" target=\"_blank\">https://media.ford.com/content/fordmedia/fna/us/en/news/2016/08/16/ford-targets-fully-autonomous-vehicle-for-ride-sharing-in-2021.html</a></li><li>Michele Bertoncello &amp; Dominik Wee, \"Ten ways autonomous driving could redefine the automotive world\". McKinsey &amp; Company. <a href=\"http://www.mckinsey.com/industries/automotive-and-assembly/our-insights/ten-ways-autonomous-driving-could-redefine-the-automotive-world\" rel=\"noopener noreferrer\" target=\"_blank\">http://www.mckinsey.com/industries/automotive-and-assembly/our-insights/ten-ways-autonomous-driving-could-redefine-the-automotive-world</a></li><li>\"10 million self-driving cars will be on the road by 2020\". Business Insider. <a href=\"http://www.businessinsider.com/report-10-million-self-driving-cars-will-be-on-the-road-by-2020-2015-5-6?r=US&amp;IR=T&amp;IR=T\" rel=\"noopener noreferrer\" target=\"_blank\">http://www.businessinsider.com/report-10-million-self-driving-cars-will-be-on-the-road-by-2020-2015-5-6?r=US&amp;IR=T&amp;IR=T</a></li><li>Fred Lambert, \"Elon Musk says owning a non-autonomous car will soon be ‘like owning a horse’\". Electrek. <a href=\"http://electrek.co/2015/11/03/elon-musk-says-owning-a-non-autonomous-car-will-soon-be-like-owning-a-horse-2/\" rel=\"noopener noreferrer\" target=\"_blank\">http://electrek.co/2015/11/03/elon-musk-says-owning-a-non-autonomous-car-will-soon-be-like-owning-a-horse-2/</a></li><li>Adrienne Lafrance, \"Self-Driving Cars Could Save 300,000 Lives Per Decade in America\". The Atlantic. <a href=\"http://www.theatlantic.com/technology/archive/2015/09/self-driving-cars-could-save-300000-lives-per-decade-in-america/407956/\" rel=\"noopener noreferrer\" target=\"_blank\">http://www.theatlantic.com/technology/archive/2015/09/self-driving-cars-could-save-300000-lives-per-decade-in-america/407956/</a></li><li>\"IBM Watson-powered \"Olli\" is unveiled in Washington DC. Olli is a 3D-printed minibus\". Rajamanickam Antonimuthu. <a href=\"https://youtu.be/LaiB33zSB4Y?t=20s\" rel=\"noopener noreferrer\" target=\"_blank\">https://youtu.be/LaiB33zSB4Y?t=20s</a></li><li>Lydia Chain, \"In Greece, Driverless Buses Are Now Accepting Passengers\". Popular Science. <a href=\"http://www.popsci.com/driverless-buses-go-with-traffic-flow\" rel=\"noopener noreferrer\" target=\"_blank\">http://www.popsci.com/driverless-buses-go-with-traffic-flow</a></li></ul>",
//             "media": {
//                 "video": "https://www.youtube.com/embed/GWS4Q8djVB8?start=18",
//                 "image": "",
//                 "text": "Question Your World - How will driverless cars change our world?, Science Museum of Virginia"
//             },
//             "time_range": {
//                 "min": 2024,
//                 "max": 2028
//             },
//             "related_phenomena": [
//                 "4678aaf5-fafb-4b18-9f64-2eea9453d604",
//                 "82b1845e-b869-414d-8449-af718dc9f560",
//                 "30da7f9a-4888-4b29-8e9c-e0a27bffe0b8",
//                 "91055d26-88de-4878-9018-8d43d2b43880",
//                 "e2a69524-24a5-4098-baaa-f4b889014d2b",
//                 "84483045-08d4-48b9-a12f-36384a6b02f0"
//             ],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "db87c57f-a2eb-431d-b71f-d296d21e322a"
//             ],
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "cooling",
//         "content-type-title": "Weakening",
//         "color": "none",
//         "rating_x": {
//             "avg": "89.0000000000000000",
//             "median": 89,
//             "values": [
//                 89
//             ]
//         },
//         "rating_y": {
//             "avg": "84.0000000000000000",
//             "median": 84,
//             "values": [
//                 84
//             ]
//         },
//         "ratingCurrentX": 89,
//         "ratingCurrentY": 84
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "b180a14c-77f3-4b18-91f3-47e233bd3634",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1924,
//         "created_by": 1924,
//         "updated_at": "2018-11-19T17:26:02.000Z",
//         "created_at": "2018-11-19T17:26:02.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Surface Media",
//             "short_title": "Surface Media",
//             "summary": "In the near future, various surfaces can be utilised as media interfaces. As the technology becomes cheaper and more advanced, the features of the built environment, such as windows, walls, desks, sidewalks, and, for example, clothes, can be equipped in such a way that they can act as platforms for interactive advertisements and other media, such as videos.",
//             "body": "<h2>Background</h2><p>The introduction of bendable displays creates a possibility to turn different surfaces to media platforms. This, on its part, may enable a new kind of interactivity with the built environment, as the walls can act as displays. Similarly, electronic advertisements will be introduced to places where they have not conventionally been present.</p><p>Already in the 00s, Philips Lumalive was a functioning example of textiles that made use of graphics and imagery. Technology has since advanced and, at the moment, especially the smartphones are the trailblazers in the utilisation of display technologies. The increase of media surfaces in a built environment will not necessarily lead to a constant stream of stimuli and messages, but instead, the media contents can, depending on the purpose of the space, be directed to encourage relaxation and wellbeing.</p><h3>Additional Information</h3><ul><li>“Flexible display”. Wikipedia. <a href=\"https://en.wikipedia.org/wiki/Flexible_display\" target=\"_blank\">https://en.wikipedia.org/wiki/Flexible_display</a></li><li>James Rogerson, “Samsung Galaxy X: the story of Samsung's foldable phone so far”. Techradar. <a href=\"https://www.techradar.com/news/samsung-galaxy-x-the-story-of-samsungs-foldable-phone-so-far\" target=\"_blank\">https://www.techradar.com/news/samsung-galaxy-x-the-story-of-samsungs-fo...</a></li><li>”You can draw electrical wires with this cheap conductive paint”. Mashable. <a href=\"https://www.facebook.com/mashable/videos/10155301867569705/\" target=\"_blank\">https://www.facebook.com/mashable/videos/10155301867569705/</a></li><li>”Smart contact lenses allow you to record and play back video”. Science Nature Page. <a href=\"https://www.facebook.com/ScienceNaturePage/videos/1087812741350983/\" target=\"_blank\">https://www.facebook.com/ScienceNaturePage/videos/1087812741350983/</a></li><li>”Future of screens”. Genius Club. <a href=\"https://www.facebook.com/GeniusClub.KeliNetwork/videos/1300354513417489/\" target=\"_blank\">https://www.facebook.com/GeniusClub.KeliNetwork/videos/1300354513417489/</a></li><li>”Glimpse the Store of the Future - Connected Mirror”. Bloomberg. <a href=\"https://youtu.be/wr28_Pmg1Ag?t=1m15s\" target=\"_blank\">https://youtu.be/wr28_Pmg1Ag?t=1m15s</a></li><li>\"This Video Demonstrates LG’s New Line of Folding TV Screens\". Futurism. <a href=\"http://futurism.com/videos/video-demonstrates-lgs-new-line-folding-tv-screens/\" target=\"_blank\">http://futurism.com/videos/video-demonstrates-lgs-new-line-folding-tv-screens/</a></li><li>”Samsung Mirror Displays Stun at NYFW”. Samsung Business USA. <a href=\"https://www.youtube.com/embed/SLAFCVeV6KI?start=23\" target=\"_blank\">https://www.youtube.com/embed/SLAFCVeV6KI?start=23</a></li><li>”Indiegogo Pitch: BROADCAST - The world's first touch-enabled t-shirt”. <a href=\"https://youtu.be/Z0mp6RfaUuc\" target=\"_blank\">https://youtu.be/Z0mp6RfaUuc</a></li><li>\"The Cicret Bracelet: Like a tablet...but on your skin\". Cicret. <a href=\"https://www.youtube.com/watch?v=9J7GpVQCfms\" target=\"_blank\">https://www.youtube.com/watch?v=9J7GpVQCfms</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/KHSdObeUdxI?start=12",
//                 "image": "",
//                 "text": "LG OLED TV rolls up like a piece of paper, CNET"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "2fe19072-b0a4-40b9-88a2-271732f1951e"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "88.0000000000000000",
//             "median": 88,
//             "values": [
//                 88
//             ]
//         },
//         "rating_y": {
//             "avg": "84.0000000000000000",
//             "median": 84,
//             "values": [
//                 84
//             ]
//         },
//         "ratingCurrentX": 88,
//         "ratingCurrentY": 84
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "5819f800-9c14-4243-a64a-2e2168016acd",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-10-04T11:29:14.000Z",
//         "created_at": "2018-10-04T11:29:14.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Automated Supermarket",
//             "short_title": "Automated Supermarket",
//             "summary": "Full automation of supermarkets is emerging. First of its kind, Amazon Go works already without any sales personnel using a mobile app, artificial intelligence and sensors.\n",
//             "body": "<h2>Background</h2><p>There is already significant automation in supermarkets, if you consider the changes in cash registers over the last decades from bar codes to automatic tellers. Yet a supermarket without any sales personnel has not been possible until the recent advances in sensors, machine vision and deep learning algorithms.</p><p>Amazon Go has introduced ”Just walk out” technology, a shop without lines and check outs. A Beta store has been opened in Seattle. Amazon plans to develop the technology and open stores as they learn more. Before some critical posts emerged, there was a notion of opening 2000 automated stores, which Amazon quickly denied.</p><h2>Impacts</h2><p>According to Forbes, fully automated supermarket is a big job killer. In United States, 7.3 million people work as cashiers. Automation will radically change retail store employment, even if it is suited for only certain kinds of products where customer service is not required.</p><h3>Additional Information</h3><ul><li>Rachel Metz, ”Amazon’s cashier-less Seattle grocery store is opening to the public”. MIT Technology Review. <a href=\"https://www.technologyreview.com/s/610006/amazons-checkout-free-grocery-store-is-opening-to-the-public/\" target=\"_blank\">https://www.technologyreview.com/s/610006/amazons-checkout-free-grocery-store-is-opening-to-the-public/</a></li><li>\"Amazon Go\". Amazon. <a href=\"https://www.amazon.com/b?node=16008589011\" target=\"_blank\">https://www.amazon.com/b?node=16008589011</a></li><li>Drew Hansen, ”Amazon Go Doesn't Have To Be The End Of The American Dream”. Forbes. <a href=\"http://www.forbes.com/sites/drewhansen/2016/12/19/amazon-go-end-american-dream/#49698f8a4fd7\" target=\"_blank\">http://www.forbes.com/sites/drewhansen/2016/12/19/amazon-go-end-american-dream/#49698f8a4fd7</a></li><li>Leena Rao, ”Amazon Go Debuts as a New Grocery Store Without Checkout Lines”. Fortune. <a href=\"http://fortune.com/2016/12/05/amazon-go-store/\" target=\"_blank\">http://fortune.com/2016/12/05/amazon-go-store/</a></li><li>Erik Sherman, ” Amazon's Grocery Would Eliminate Thousands Of Jobs”. Forbes. <a href=\"http://www.forbes.com/sites/eriksherman/2016/12/07/amazons-grocery-would-eliminate-thousands-of-jobs/#372e134d36d9\" target=\"_blank\">http://www.forbes.com/sites/eriksherman/2016/12/07/amazons-grocery-would-eliminate-thousands-of-jobs/#372e134d36d9</a></li><li>Hannah White, ”Amazon Go: We’re All F**ked”. Huffington Post. <a href=\"http://www.huffingtonpost.com/entry/amazon-go-were-all-fcked_us_58518f04e4b0320ed05a9a7e#\" target=\"_blank\">http://www.huffingtonpost.com/entry/amazon-go-were-all-fcked_us_58518f04e4b0320ed05a9a7e#</a></li></ul>",
//             "media": {
//                 "video": "https://www.youtube.com/embed/NrmMk1Myrxc",
//                 "image": "",
//                 "text": "Introducing Amazon Go and the world’s most advanced shopping technology. Amazon."
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "8e87fb39-2b2b-49ae-abea-3dc8e5a5ea40"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "87.0000000000000000",
//             "median": 87,
//             "values": [
//                 87
//             ]
//         },
//         "rating_y": {
//             "avg": "84.0000000000000000",
//             "median": 84,
//             "values": [
//                 84
//             ]
//         },
//         "ratingCurrentX": 87,
//         "ratingCurrentY": 84
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "a5c953d4-6f25-48a2-aca8-259fa086e131",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-10-15T09:16:47.000Z",
//         "created_at": "2018-10-15T09:16:47.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "AR Historic Geoinformation",
//             "short_title": "AR Historic Geoinformation",
//             "summary": "Historic material tied to a certain location is collected and saved on various Internet platforms. Getting to know the history of a given location is possible through applications offering experiences through photographs, stories, and audiovisual content.\n",
//             "body": "<h2>Background</h2><p>A number of web sites and mobile apps enable getting to know the history of a given location through text, image, and audio material. Such narrative or image maps have been constructed from different cities, regions, and locations with materials from public archives or crowdsourced databases. Augmented reality applications that bring the past to life are under development and already available all around the world.</p><p>Technological development and the digitalisation of historic materials enable creating a living past that offers whole new kinds of experiences for us as well as later generations. This development is assisted by increasingly common mobile technologies that allow end-users a far wider awareness of their virtual surroundings and information than looking at the tablet or phone screen ever could.&nbsp;History is utilised and recreated in an increasingly interactive way in the future.</p><h2>Impacts</h2><p>Digital, location-specific history creates new kinds of opportunities for developing entertainment, culture, and tourist services. It also opens up new methods of learning and research. The services currently under development also shape the ground for future applications as the rich and wide digital material created regarding each and every one of us provides increasingly versatile possibilities for the utilisation of location-specific historic data.</p><h3>Additional Information</h3><ul><li>Nathan MacAlone, \"This guy used over 80,000 old photographs to create a Google Street View map of New York City in the 1800s\". Business Insider. <a href=\"http://www.businessinsider.my/old-photos-of-new-york-city-in-the-1800s-with-google-street-view-2016-7/\" target=\"_blank\">http://www.businessinsider.my/old-photos-of-new-york-city-in-the-1800s-with-google-street-view-2016-7/</a></li><li>\"Helping the World Map Its Past\". SepiaTown. <a href=\"http://sepiatown.com/\" target=\"_blank\">http://sepiatown.com/</a></li><li>\"WhatWasThere ties historical photos to Google Maps\".Enlighten Ventures. <a href=\"http://www.whatwasthere.com/\" target=\"_blank\">http://www.whatwasthere.com/</a></li><li>\"Collage - The London Picture Map\". City of London Corporation. <a href=\"http://collage.cityoflondon.gov.uk/london-picture-map\" target=\"_blank\">http://collage.cityoflondon.gov.uk/london-picture-map</a></li><li>\"Edinburgh’s history through Stories, Images and Historical Maps\". City of Edinburgh Council. <a href=\"http://www.ourtownstories.co.uk/\" target=\"_blank\">http://www.ourtownstories.co.uk/</a></li><li>\"Mixed reality technology — the future of tourism may be the virtual past\". The Japan Times. <a href=\"https://www.youtube.com/watch?v=wuYL61FPklw\" target=\"_blank\">https://www.youtube.com/watch?v=wuYL61FPklw</a></li><li>Mäkilä, T., et al. (2013). The Futuristic History project: recreating history with augmented reality solutions. Proceedings of NODEM, 165-170. <a href=\"http://repo.nodem.org/uploads/The%20Futuristic%20History%20project.pdf\" target=\"_blank\">http://repo.nodem.org/uploads/The%20Futuristic%20History%20project.pdf</a></li></ul>",
//             "media": {
//                 "video": "https://www.youtube.com/embed/HlbA7G8V3jA?start=45",
//                 "image": "",
//                 "text": "The Berlin Wall App, Timetraveler Augmented"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "27a1a093-c164-4d7e-af8d-d8e5067c10e7"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "84.0000000000000000",
//             "median": 84,
//             "values": [
//                 84
//             ]
//         },
//         "rating_y": {
//             "avg": "83.0000000000000000",
//             "median": 83,
//             "values": [
//                 83
//             ]
//         },
//         "ratingCurrentX": 84,
//         "ratingCurrentY": 83
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "8f60d7f6-5360-4076-9682-091d6124f691",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1,
//         "updated_at": "2020-04-24T07:50:28.091Z",
//         "created_at": "2020-02-13T15:03:06.000Z",
//         "content": {
//             "type": "9c7a97a7-3650-45f9-9ab4-a489a5970506",
//             "title": "given timing short-term",
//             "short_title": "test",
//             "summary": "",
//             "body": "",
//             "media": {
//                 "video": "",
//                 "image": "",
//                 "text": ""
//             },
//             "time_range": {
//                 "min": 2028,
//                 "max": 2040
//             },
//             "related_phenomena": [
//                 "6425a4a5-8d1f-4084-bf0c-87c989c154f9",
//                 "64c2f73c-bd6b-4081-aa8c-0d808dcd0969",
//                 "468e99d6-25f1-4066-93fe-82b41d31ef36",
//                 "02faf7ea-f23f-40d1-aad0-ab881bd75088"
//             ],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [],
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "cooling",
//         "content-type-title": "Weakening",
//         "color": "none",
//         "rating_x": {
//             "avg": "67.0000000000000000",
//             "median": 67,
//             "values": [
//                 67
//             ]
//         },
//         "rating_y": {
//             "avg": "83.0000000000000000",
//             "median": 83,
//             "values": [
//                 83
//             ]
//         },
//         "ratingCurrentX": 67,
//         "ratingCurrentY": 83
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "ba87f9a9-baa4-4dd3-ac2c-d3a03bea2d78",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2019-02-05T11:32:19.000Z",
//         "created_at": "2019-02-05T11:32:19.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Biodomes",
//             "short_title": "Biodomes",
//             "summary": "Greenhouse-like biodomes have become a part of urban architecture. For example, a large airport terminal and several office buildings that bring light and the nature closer to the everyday of city dwellers are under construction. Often the architecture of biodomes does not only consider issues pertaining to enjoyment or visuals, but the projects also aim for sustainable development.\n",
//             "body": "<h3>Additional Information</h3><ul><li>Lauren Shamo, ”Amazon is building giant spheres to give its employees a 'direct link to nature’”. Business Insider. <a href=\"http://www.businessinsider.com/amazon-spheres-seattle-video-photos-details-updates-2017-8?r=US&amp;IR=T&amp;IR=T\" target=\"_blank\">http://www.businessinsider.com/amazon-spheres-seattle-video-photos-details-updates-2017-8?r=US&amp;IR=T&amp;IR=T</a></li><li>Oliver Wainwright, \"Google's new headquarters: an upgradable, futuristic greenhouse\". The Guardian. <a href=\"https://www.theguardian.com/artanddesign/2015/feb/27/googles-new-headquarters-upgradable-futuristic-greenhouse\" target=\"_blank\">https://www.theguardian.com/artanddesign/2015/feb/27/googles-new-headquarters-upgradable-futuristic-greenhouse</a></li><li>\"Eden Project\". SkyEye Britain. <a href=\"https://www.youtube.com/watch?v=8ltmnDNWa6A\" target=\"_blank\">https://www.youtube.com/watch?v=8ltmnDNWa6A</a></li><li>Tafline Laylin,\"Giant bubble “greenhouse” covers this lush new retail center in Turkey\". Inhabitat. <a href=\"http://inhabitat.com/giant-bubble-greenhouse-covers-this-lush-new-retail-center-in-turkey/\" target=\"_blank\">http://inhabitat.com/giant-bubble-greenhouse-covers-this-lush-new-retail-center-in-turkey/</a></li><li>Lucy Wang, \"New municipal building in Stockholm will look and act just like a greenhouse\". Inhabitat. <a href=\"http://inhabitat.com/could-stockholms-new-greenhouse-building-end-boring-municipal-design/\" target=\"_blank\">http://inhabitat.com/could-stockholms-new-greenhouse-building-end-boring-municipal-design/</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/B4DyO5xWR1o?start=25",
//                 "image": "",
//                 "text": "A First Look: Jewel Changi Airport, Changi Airport Group"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "96eb1102-728a-4dd5-9e28-d39c9d79b6cb"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "86.0000000000000000",
//             "median": 86,
//             "values": [
//                 86
//             ]
//         },
//         "rating_y": {
//             "avg": "82.0000000000000000",
//             "median": 82,
//             "values": [
//                 82
//             ]
//         },
//         "ratingCurrentX": 86,
//         "ratingCurrentY": 82
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "0c78ba8f-3298-492c-9b34-13f7d83a6ec9",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-10-08T13:42:40.000Z",
//         "created_at": "2018-10-08T13:42:40.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Valuing Free Time",
//             "short_title": "Valuing Free Time",
//             "summary": "Several employees value free time more than rapid career development or a pay raise. Different kinds of work and lifestyle choices are often aimed to create a better work-life balance.\n",
//             "body": "<h2>Background</h2><p>Amidst hectic work life and permanent stress, many employees wish they had more free time. Leisure time and its benefits are often valued higher and more rewarding than what could be achieved merely by accumulating wealth. Many studies also support the higher evaluation of free time; people who appreciate time over money often feel happier than people who focus on wealth. Appreciation of free time can also be seen in the investments people make to improve its contents and quality. People make use of a variety of services, experiences, and hobbies that aim to take their minds off work and on enjoying free time. More and more people also give great value to increased time spent with family and close ones.</p><p>One reason for the higher appreciation of free time is the different kind of relationship younger generations have with work. For the Y generation, which has already entered work markets and executive positions, work-life balance is one of the most essential issues affecting job satisfaction. For them, job isn’t everything but free time provides a more important significance to their lives than for earlier generations. They desire flexible employment relationships that better enable balancing work with other parts of their lives. For example, the popularity of teleworking has increased, because many appreciate the smaller amount of time spent commuting and the greater freedom to enjoy free time without additional limitations caused by the location of the workplace. People also value flexible work times, because they provide an opportunity to reduce the restrictions caused by strict hours and enable a more adjustable scheduling of private life responsibilities and hobbies.</p><h2>Impacts</h2><p>Organisations that wish to obtain a motivated and committed employee base need to increase investment into the meaningfulness and flexibility of work. In recruiting the most competent individuals, offering more individualised work solutions may prove far more successful than merely dishing out more money. New kinds of pressures and challenges regarding organising work arise for employers, who should start paying more and more attention to employees’ needs and wishes.</p><h3>Additional Information</h3><ul><li>The Deloitte Millennial Survey 2017 - Winning over the next generation of leaders”. Deloitte. <a href=\"http://www2.deloitte.com/global/en/pages/about-deloitte/articles/millennialsurvey.html\" target=\"_blank\">http://www2.deloitte.com/global/en/pages/about-deloitte/articles/millennialsurvey.html</a></li><li>Gray Matter, ”What Should You Choose: Time or Money?”. New York Times. <a href=\"http://www.nytimes.com/2016/09/11/opinion/sunday/what-should-you-choose-time-or-money.html?_r=0\" target=\"_blank\">http://www.nytimes.com/2016/09/11/opinion/sunday/what-should-you-choose-time-or-money.html?_r=0</a></li><li>Charlie Sorrel, ”Science Says You Should Quit Your Demanding, High-Paying Job”. Fast Company. <a href=\"https://www.fastcoexist.com/3055331/why-you-should-prioritize-free-time-instead-of-money-if-you-want-to-be-happy\" target=\"_blank\">https://www.fastcoexist.com/3055331/why-you-should-prioritize-free-time-instead-of-money-if-you-want-to-be-happy</a></li><li>Mr. Money Moustache, ”I retired at 30. The best part isn't leisure — it's freedom”. Vox. <a href=\"http://www.vox.com/2015/7/27/9023415/mr-money-mustache-retirement\" target=\"_blank\">http://www.vox.com/2015/7/27/9023415/mr-money-mustache-retirement</a></li><li>Mogilner, C., &amp; Norton, M. I. (2016). Time, money, and happiness. Current Opinion in Psychology, 10, 12-16.</li><li>Whillans, A. V., Weidman, A. C., &amp; Dunn, E. W. (2016). Valuing time over money is associated with greater happiness. Social Psychological and Personality Science, 7(3), 213-222.</li><li>Hershfield, H. E., Mogilner, C., &amp; Barnea, U. (2016). People Who Choose Time Over Money Are Happier. Social Psychological and Personality Science, 1948550616649239.</li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/MIYUz41JD00?start=34",
//                 "image": "",
//                 "text": "Valuing time over money linked to happiness, study shows, Dr. Holly Phillips, CBS This Morning"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "b5bf4d0d-de07-4621-8b50-408b2d83e596"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "81.0000000000000000",
//             "median": 81,
//             "values": [
//                 81
//             ]
//         },
//         "rating_y": {
//             "avg": "82.0000000000000000",
//             "median": 82,
//             "values": [
//                 82
//             ]
//         },
//         "ratingCurrentY": 82,
//         "ratingCurrentX": 81
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "5e7b917c-b22f-45c8-9540-e2f46c8014f0",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-12-04T09:45:15.000Z",
//         "created_at": "2018-12-04T09:45:15.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Digital Real Estate Business",
//             "short_title": "Digital Real Estate Business",
//             "summary": "Real estate business is becoming both digitalized and automatized, making it more dynamic, flexible and cost-effective. Space will gradually transform into a service, which makes the user experience (UX) more critical than ever. Both the construction and real estate industry, as well as cities, will face diverse opportunities and challenges which demand immediate responses.",
//             "body": "<h2>Background</h2><p>Thanks to digitalization of both real estate business and the real estates themselves, information, so far confined in silos, will become available for exploitation, as the real estate systems start to communicate with each other.&nbsp;For example, real estate maintenance expert can guide a person on the premises to perform a check-up, repair or some other operation. Meanwhile, both work and business will become less dependent on time and location, manifesting as rising utilization rate and overbooking, which have a direct impact on the demand and quality of the spaces.</p><p>In interactive and smart real estates and built environments of the future, devices (IoT), people, things, processes, wireless electricity transmission, and information recording and its Internet-based transfer, will most likely be combined. As digitalization, AR/VR, IoT and growing efficiency become united with another accelerating trend, namely under-utilization preventing sharing economy, the real estate business starts to develop towards a new hybrid between ownership and renting, for which the solutions of platform economy, e.g., Liquidspace, will provide highly versatile possibilities. New, adaptable, service-based models of space usage will emerge, which redefine the payer and what the payment is for, and who funds it all.</p><p>In the future, along with cities, single buildings will most likely become autonomous regarding their power supply and waste management, which means that the structure produces its own energy, stores the surplus to high voltage batteries and sells it to the public grid. Such energy solutions will most likely feature solar, wind and bioenergy, combined with storage batteries, but it is also likely, that the coming energy conservation model might be based on the possibilities of the hydrogen economy, i.e., on hydrogen fuel cells and metallic hydrogen. Additionally, it is conceivable that the real estates will start, through thermo- and piezoelectric generators, a large-scale utilization of the waste energy created by pressure, voltage and temperature differences.</p><h2>Impacts</h2><p>All fields related to construction and housing are in constant change, but the transformation has been exceptionally quick in the real estate business. Digitalization and automatization are introducing more effective services and cost reductions, but at the same time, they are rising the expectations consumers have for real estates and housing.</p><p>One example of the challenges facing construction and real estate business, as well as cities, are the reduced lengths of both employment, space, and service contracts. The change of spaces to services means to real estate providers that the user experience will become increasingly significant.</p><h3>Additional Information</h3><ul><li>\"Digital Real Estate with SAP\". SAP Industries. <a href=\"https://youtu.be/rNqTqcJ76IU\" target=\"_blank\">https://youtu.be/rNqTqcJ76IU</a></li><li>Mikko Östring et. al “Five Drivers of Change in the Real Estate Business - Why Is It Changing and What Can We Expect?”. Futures Platform. <a href=\"https://www.futuresplatform.com/blog/five-drivers-change-real-estate-business\" target=\"_blank\">https://www.futuresplatform.com/blog/five-drivers-change-real-estate-business</a></li><li>\"Research Real Estate Tech: 15-Min Flash Briefing: Housing of the Future\". CB Insights. <a href=\"https://www.cbinsights.com/research/real-estate-tech/\" target=\"_blank\">https://www.cbinsights.com/research/real-estate-tech/</a></li><li>Mark Gilbreath, “Peak Office and the Age of Un-building”. TEDxSunValley. <a href=\"https://youtu.be/mpfRGpJe8Ss\" target=\"_blank\">https://youtu.be/mpfRGpJe8Ss</a></li></ul>",
//             "media": {
//                 "video": "https://www.youtube.com/embed/jHNetehfW9w?start=9",
//                 "image": "",
//                 "text": "Workplace of the future: How will you work in 2030, JLL"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "dafe93f8-46c6-4455-b42b-cb3009401075"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "89.0000000000000000",
//             "median": 89,
//             "values": [
//                 89
//             ]
//         },
//         "rating_y": {
//             "avg": "80.0000000000000000",
//             "median": 80,
//             "values": [
//                 80
//             ]
//         },
//         "ratingCurrentY": 80,
//         "ratingCurrentX": 89
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "74ed5389-8975-4d7b-86af-6bedb3915e38",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2019-03-06T11:31:32.000Z",
//         "created_at": "2019-03-06T11:31:32.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "High Speed Travel",
//             "short_title": "High Speed Travel",
//             "summary": "Ever faster means of transport are under development to answer the increasing demand for transportation and the needs of growing cities. The technologies behind the newest mass transit vehicles significantly differ from earlier solutions as they aim for high speeds with the help of electromagnetic levitation and air pressure.\n",
//             "body": "<h2>Background</h2><p>A variety of bullet trains and transport capsules are currently being developed to provide unprecedented travel speeds. The new means of transport now in testing make use of electromagnetic levitation and air pressure. The new technologies do not merely offer higher velocities but also, if successful, lessen the ease our dependency on fossil fuels.</p><p>The first electromagnetic Maglev train was introduced to city traffic in Shanghai, China, already over a decade ago. Currently, it transports passengers at speeds up to 430 km/h. In Japan, a Maglev train has reached a velocity exceeding 600 km/h in tests. Hyperloop capsules, which use air pressure, are vigorously developed and tested. Hyperloop aims to fully revolutionize travel by offering speeds up to 1300 km/h.</p><h2>Impacts</h2><p>The development and spread of new transport means are naturally slowed down by the huge investments they require as well as a variety of infrastructure and safety issues. However, development work and investments are continuously made and we can expect that distances will seem to shrink. Thus far air travel has dominated travel with its relatively high velocities, but in the future air traffic will face truly competitive alternatives.</p><h3>Additional Information</h3><ul><li>Arthur Cios, ”Global Subway Map Imagines A World Connected By Hyperloop”. Konbini. <a href=\"https://go2.futuresplatform.com/%E2%80%8Bhttp://www.konbini.com/us/lifestyle/global-subway-map-imagines-world-connected-by-hyperloop/\" target=\"_blank\">http://www.konbini.com/us/lifestyle/global-subway-map-imagines-world-connected-by-hyperloop/</a></li><li>Bruno Jacobsén, ”Is the Hyperloop Coming to the Nordics? The Possibility of a Nordic Super-Region”. Futures Platform. <a href=\"http://www.futuresplatform.com/blog/hyperloop-coming-nordics-0\" target=\"_blank\">http://www.futuresplatform.com/blog/hyperloop-coming-nordics-0</a></li><li>Faiz Siddigui, ”The 70 mph test run that Hyperloop is hailing as a ‘Kitty Hawk moment’”. The Washington Post. <a href=\"https://www.washingtonpost.com/news/dr-gridlock/wp/2017/07/12/the-70-mph-test-run-that-hyperloop-is-hailing-as-a-kitty-hawk-moment/?utm_term=.28ea0d0220d7\" target=\"_blank\">https://www.washingtonpost.com/news/dr-gridlock/wp/2017/07/12/the-70-mph-test-run-that-hyperloop-is-hailing-as-a-kitty-hawk-moment/?utm_term=.28ea0d0220d7</a></li><li>\"Japan's maglev train breaks world speed record\". Al Jazeera. <a href=\"https://www.youtube.com/watch?v=zYvEP6tYvP0\" target=\"_blank\">https://www.youtube.com/watch?v=zYvEP6tYvP0</a></li><li>Dom Galeon, ”A New “Tube Transport” System Could Get You From New York to Beijing in 2 Hours”. Futurism. <a href=\"https://futurism.com/a-new-tube-transport-system-could-get-you-from-new-york-to-beijing-in-2-hours/\" target=\"_blank\">https://futurism.com/a-new-tube-transport-system-could-get-you-from-new-york-to-beijing-in-2-hours/</a></li><li>Mary-Ann Russon,\"HTT vs Hyperloop One: What are the differences between futuristic high speed train technologies?\". IBT. <a href=\"http://www.ibtimes.co.uk/htt-vs-hyperloop-one-what-are-differences-between-futuristic-high-speed-train-technologies-1560387\" target=\"_blank\">http://www.ibtimes.co.uk/htt-vs-hyperloop-one-what-are-differences-between-futuristic-high-speed-train-technologies-1560387</a></li></ul>",
//             "media": {
//                 "video": "https://www.youtube.com/embed/7A7GsAPR3J0?start=10",
//                 "image": "",
//                 "text": "700 mph in a tube: The Hyperloop experience, CNN Business"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "8d703989-f1f5-40b6-970e-d074c05487f8"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "80.0000000000000000",
//             "median": 80,
//             "values": [
//                 80
//             ]
//         },
//         "rating_y": {
//             "avg": "80.0000000000000000",
//             "median": 80,
//             "values": [
//                 80
//             ]
//         },
//         "ratingCurrentX": 80,
//         "ratingCurrentY": 80
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "397e697b-2f4d-4eb6-9df0-9e627e17255e",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2019-02-01T12:09:55.000Z",
//         "created_at": "2019-02-01T12:09:55.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Vertical Farming",
//             "short_title": "Vertical Farming",
//             "summary": "In vertical farming, plants are not grown horizontally on the fields but indoors, on several layers on top of each other. It is believed, that vertical agriculture enhances both the quality and quantity of the crops. This is due to a controlled environment optimized for the plants.",
//             "body": "<h2>Background</h2><p>Vertical farming brings primary production near and to cities. Efficient use of space combined with high productivity might start a new era in the history of agriculture and create a whole new industry of urban farming.</p><p>Through vertical farming, external risk factors like, for example, diseases and contamination, can almost be eliminated from the growth processes. Control over the growth circumstances, e.g., lighting and nutrients, makes it possible to have an abundant and nutrient-rich harvest. Also, because of a controlled environment, the resources used for farming can be utilized more efficiently. Vertical agriculture is divided into two branches: hydroponics and aeroponics. In hydroponics, plants are grown in water-containers with nutrient solutions, whereas in aeroponics the roots of plants are being sprayed with a water-nutrient solution.</p><p>Vertical farming has its problems also. Among other things, real-estate costs, lighting costs, and recycling of the used water are all challenges waiting to be solved. However, several companies specialized in vertical farming have been able to secure ample funding from investors, and the industry is believed to grow in the coming years.&nbsp;</p><h3>Additional Information</h3><ul><li>Aya Takada, \"Skyscraper farms are about to go global\". Bloomberg. <a href=\"https://www.bloomberg.com/news/articles/2018-10-30/skyscraper-farms-are-about-to-go-global?fbclid=IwAR102y7yaO5WctnIHYvjR0eD-jxJtW7vuiULFFyYhJcTRa_MqXFtXq7zfV0\" target=\"_blank\">https://www.bloomberg.com/news/articles/2018-10-30/skyscraper-farms-are-about-to-go-global?fbclid=IwAR102y7yaO5WctnIHYvjR0eD-jxJtW7vuiULFFyYhJcTRa_MqXFtXq7zfV0</a></li><li>Ronald Holden, “It’s called vertical farming, and it could be the future of agriculture”. Forbes. <a href=\"https://www.forbes.com/sites/ronaldholden/2017/11/04/its-called-vertical-farming-and-it-could-be-the-future-of-agriculture/#72ad990a1175\" target=\"_blank\">https://www.forbes.com/sites/ronaldholden/2017/11/04/its-called-vertical-farming-and-it-could-be-the-future-of-agriculture/#72ad990a1175</a></li><li>Chris Baraniuk, “How vertical farming reinvents agriculture”. BBC. <a href=\"http://www.bbc.com/future/story/20170405-how-vertical-farming-reinvents-agriculture\" target=\"_blank\">http://www.bbc.com/future/story/20170405-how-vertical-farming-reinvents-agriculture</a></li><li>Sierra Clark, “Vertical farming funding on the rise in 2017 &amp; predictions for 2022”. Agritecture. <a href=\"https://www.agritecture.com/post/2017/12/29/vertical-farming-funding-on-the-rise-in-2017-predictions-for-2022\" target=\"_blank\">https://www.agritecture.com/post/2017/12/29/vertical-farming-funding-on-the-rise-in-2017-predictions-for-2022</a></li><li>“Vertical farming”. Wikipedia. <a href=\"https://en.wikipedia.org/wiki/Vertical_farming\" target=\"_blank\">https://en.wikipedia.org/wiki/Vertical_farming</a></li><li>“Vertical farming”. Reactions. <a href=\"https://www.youtube.com/watch?time_continue=93&amp;v=rEw-VfFkUik\" target=\"_blank\">https://www.youtube.com/watch?time_continue=93&amp;v=rEw-VfFkUik</a></li><li>“Backlight The Rise of Vertical Farming”. Plantagon. <a href=\"https://www.youtube.com/watch?v=WOQHwjnOTng\" target=\"_blank\">https://www.youtube.com/watch?v=WOQHwjnOTng</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/pGtdoGXhjxQ?start=23",
//                 "image": "",
//                 "text": "Tokyo’s Vertical Farms - The Future of Farming, WIRED"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "c8d74e48-eccd-415d-bb55-755b9f7e67a7"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "73.0000000000000000",
//             "median": 73,
//             "values": [
//                 73
//             ]
//         },
//         "rating_y": {
//             "avg": "80.0000000000000000",
//             "median": 80,
//             "values": [
//                 80
//             ]
//         },
//         "ratingCurrentX": 73,
//         "ratingCurrentY": 80
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "099e7e12-cd0c-47ab-9f51-ae158ffd2d0c",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-10-16T13:07:18.000Z",
//         "created_at": "2018-10-16T13:07:18.000Z",
//         "content": {
//             "type": "474ead6c-06c4-46a9-bf9f-258682108888",
//             "title": "Luminous Pathways",
//             "short_title": "Luminous Pathways",
//             "summary": "All around the world materials and products are being developed to be used as new means of lighting bike and pedestrian lanes. Luminous road surfaces enable advancements in traffic safety without the need for separate street lights or power sources.\n",
//             "body": "<h2>Background</h2><p>A pilot bike lane was opened in the Polish town of Lidzbark Warminski in 2016. It is able to absorb energy from sunlight during the day and emit a luminous glow for up to ten hours. The luminosity of the road surface is created with a synthetic material that includes a substance that is able to absorb solar energy and transform it into a glow. Currently the durability of the material remains a question, but developers consider it might last up to 20 years of usage. For the time being, the price tag of a luminous road far exceed that of traditional bike lanes. Besides the Polish experiment, similar kinds of surface and material solutions have been developed and tested all around the world - the aim has been to transform solar energy into luminous pathways.</p><h2>Impacts</h2><p>Various material and surface solutions enable solar energy to be used in lighting pathways and roads. Luminous pathways enable better visibility without separate light or power sources. They improve safety and they can also be used to liven up the visual attractiveness of streets and whole cities.</p><h3>Additional Information</h3><ul><li>Lacy Cooke, ”Poland unveils glowing bright blue bike lane that’s charged by the sun”. Inhabitat. <a href=\"http://inhabitat.com/poland-unveils-glowing-bright-blue-bike-lane-thats-charged-by-the-sun/\" target=\"_blank\">http://inhabitat.com/poland-unveils-glowing-bright-blue-bike-lane-thats-charged-by-the-sun/</a></li><li>Monika Kozub, ”Luminous Bike Lane Opened in Poland”. Next Nature Network. <a href=\"https://www.nextnature.net/2016/10/luminous-bike-lane-opened-poland/\" target=\"_blank\">https://www.nextnature.net/2016/10/luminous-bike-lane-opened-poland/</a></li><li>”Starpath”. Pro-Teq Surfacing UK. <a href=\"https://www.youtube.com/watch?v=DirpewBP6Cw\" target=\"_blank\">https://www.youtube.com/watch?v=DirpewBP6Cw</a></li><li>”Glow In The Dark Stones For Concrete | Melbourne | Sydney | Brisbane | Australia”. Schneppa Glass. <a href=\"https://www.youtube.com/watch?v=kNEQnU9Cqhk\" target=\"_blank\">https://www.youtube.com/watch?v=kNEQnU9Cqhk</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/jmSs7ZBnUso",
//                 "image": "",
//                 "text": "This Glow In The Dark Bike Path Is Powered By The Sun, Futurism"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "9230ae23-ea92-4bca-b1f3-b72ca3db9732"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "weaksignal",
//         "content-type-title": "Weak signal",
//         "color": "none",
//         "rating_x": {
//             "avg": "81.0000000000000000",
//             "median": 81,
//             "values": [
//                 81
//             ]
//         },
//         "rating_y": {
//             "avg": "79.0000000000000000",
//             "median": 79,
//             "values": [
//                 79
//             ]
//         },
//         "ratingCurrentY": 79,
//         "ratingCurrentX": 81
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "f4ddd228-6291-4c9e-a573-aecfb4d0f6ae",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2019-02-28T12:45:02.000Z",
//         "created_at": "2019-02-28T12:45:02.000Z",
//         "content": {
//             "type": "6528f835-0637-4dfb-8916-474b8053d68d",
//             "title": "Change in Health and Wellbeing 2027",
//             "short_title": "Health 2027",
//             "summary": "In the medium term, responsibility for the maintenance and care of one’s health will become more critical. The treatment will gradually become customer-centred and reliant on automation. Nursing staff will take the role of a sparring partner, coach, and supporter. At the same time, the augmentation of the capabilities of the human body through technological and electrical attachments starts becoming feasible. This will cause a significant ethical discussion and possibly later a grouping of people into organic-humans, who perceive the body as “sacred,” and techno-humans, who treat the body as a user interface.",
//             "body": "",
//             "media": {
//                 "video": "http://www.youtube.com/embed/ppILwXwsMng?start=6",
//                 "image": "",
//                 "text": "Man Controls Robotic Hand with Mind, Discovery"
//             },
//             "time_range": null,
//             "related_phenomena": [
//                 "26ff8040-2bcf-4084-b3fb-5d05c63008c9",
//                 "685d3342-af41-4d82-9168-f55790d3072d",
//                 "1e64653f-a684-4ca2-9066-6a23795b0a56",
//                 "01d0bcf4-59d4-4970-8317-5dc72d3141fa",
//                 "dd31a4bd-9cba-4e05-b427-ac6b1855a8cc",
//                 "fd06dc4f-aa47-4bcd-a5dd-e8ddbf13b9d5",
//                 "af4ae84d-3c6a-4c9e-9f35-73175cc02752",
//                 "d1b30d03-9c0d-4cdb-8c4e-ba57dfbc5f82",
//                 "02d93f11-796c-4616-bbb8-50aab0d1d76f",
//                 "71d0afbb-7256-4359-abfe-05b18c60bb4b",
//                 "940322a6-dc68-4278-addf-0be9ae08994e",
//                 "97e8dafb-39ef-483f-8395-66ae6bc7ae7f",
//                 "ab783f61-4684-4383-9497-a3c8ad36c6a3",
//                 "8fa81895-f991-4d26-89c4-4c92fb6c299c",
//                 "836b20d9-ef1e-404f-a67e-4cc82b2269da",
//                 "1af4eeb4-6488-45f2-8ec7-e018ce8596e1",
//                 "07516142-97ae-4bba-afe8-4501e06b73ee",
//                 "88dc3a65-9f51-4b62-a5fe-6fd09e75ec61",
//                 "a66cc79e-fed5-4b1f-a97d-bc705c196746",
//                 "d1aae504-8dde-4762-8500-ba4f9e73f386",
//                 "b06f937d-2a60-4da2-ad83-2f641e0f49ca",
//                 "b2d51ec0-9dfd-4920-93dc-11798f43e403",
//                 "a454e308-5ecc-4b40-b3cc-45daca3117ec",
//                 "51124606-9d41-4bff-a726-8bef8de67818",
//                 "012bc718-ca1c-4e54-8ac4-fc07cc70238b",
//                 "018ded76-d8c5-4287-afe2-05dea26d92c5",
//                 "417a216d-99a4-41f4-90ce-f49922ee3d1c",
//                 "874d2281-6c3f-465e-8578-773cb00587d0",
//                 "2f3d576f-02ea-4205-be5c-7736c2a42ebe",
//                 "efc23fcc-f5f5-4edf-a153-b84cc3abfa49",
//                 "851f0785-2c7b-4080-91ee-e98ed6b09769",
//                 "f4ec390b-05de-4400-8cf4-46d703e6444a",
//                 "0c78ba8f-3298-492c-9b34-13f7d83a6ec9",
//                 "4be76975-4bfe-4edc-a572-96c5a209e8be",
//                 "ec6bc07c-b79d-4130-bae6-6b606af27456",
//                 "dc340b37-9e93-486a-9c68-8959480532f6"
//             ],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": []
//         },
//         "tags": [],
//         "content-type-alias": "summary",
//         "content-type-title": "Summary",
//         "color": "none",
//         "rating_x": {
//             "avg": "78.0000000000000000",
//             "median": 78,
//             "values": [
//                 78
//             ]
//         },
//         "rating_y": {
//             "avg": "79.0000000000000000",
//             "median": 79,
//             "values": [
//                 79
//             ]
//         },
//         "ratingCurrentX": 78,
//         "ratingCurrentY": 79
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "5b20109a-7ca9-4f68-a6d5-dd8f571c35e9",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-10-02T13:16:38.000Z",
//         "created_at": "2018-10-02T13:16:38.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Bicycle Highways",
//             "short_title": "Bicycle Highways",
//             "summary": "Europe is going through a bicycle highway boom. Many cities have built or are building new, extensive bicycling networks that aim to grow the popularity and safety of the non-polluting method of commuting.\n",
//             "body": "<h3>Additional Information</h3><ul><li>Michael J. Coren, ”BMW wants to build a “hyperloop” for electric bicycles”. Quartz. <a href=\"https://qz.com/1142072/bmw-says-it-wants-to-build-a-hyperloop-for-electric-bicycles/\" target=\"_blank\">https://qz.com/1142072/bmw-says-it-wants-to-build-a-hyperloop-for-electric-bicycles/</a></li><li>Feargus O'Sullivan, ”Berlin Plans a New Network of Bike Superhighways”. CityLab. <a href=\"https://www.citylab.com/commute/2017/03/berlin-bike-superhighways/518691/\" target=\"_blank\">https://www.citylab.com/commute/2017/03/berlin-bike-superhighways/518691/</a></li><li>Julie M. Rodriguez, ”Paris opens first section of a 28-mile bicycle superhighway”. Inhabitant. <a href=\"http://inhabitat.com/paris-opens-first-section-of-a-28-mile-bicycle-superhighway/\" target=\"_blank\">http://inhabitat.com/paris-opens-first-section-of-a-28-mile-bicycle-superhighway/</a></li><li>”Denmark - Cycle Superhighway”. Ministry of Foreign Affairs of Denmark. <a href=\"http://denmark.dk/en/green-living/bicycle-culture/cycle-super-highway/\" target=\"_blank\">http://denmark.dk/en/green-living/bicycle-culture/cycle-super-highway/</a></li><li>Feargus O'Sullivan, ”Norway Will Spend Almost $1 Billion on New Bike Highways”. CityLab. <a href=\"http://www.citylab.com/cityfixer/2016/03/norway-bike-highways-billion-dollars/472059/\" target=\"_blank\">http://www.citylab.com/cityfixer/2016/03/norway-bike-highways-billion-dollars/472059/</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/5Qhu-UB7684",
//                 "image": "",
//                 "text": "Bicycle Highways Get Green Light, The David Pakman Show"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "0f3f55c8-1d14-4185-ad9b-355e36af8cc9"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "86.0000000000000000",
//             "median": 86,
//             "values": [
//                 86
//             ]
//         },
//         "rating_y": {
//             "avg": "77.0000000000000000",
//             "median": 77,
//             "values": [
//                 77
//             ]
//         },
//         "ratingCurrentX": 86,
//         "ratingCurrentY": 77
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "ab783f61-4684-4383-9497-a3c8ad36c6a3",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2019-02-11T09:51:01.000Z",
//         "created_at": "2019-02-11T09:51:01.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Internet of Things (IoT)",
//             "short_title": "Internet of Things (IoT)",
//             "summary": "The Internet of Things (IoT) has been labelled the fourth industrial revolution, and it perhaps might be the most significant one so far. This revolution is based on smart, connected products. This is made possible by rapid advancements in processing power, software, sensors, data storage, microprocessors, and wireless connectivity. According to an estimate by a multinational technology conglomerate Cisco, there will be 50 billion connected objects (things) by 2020 which equates to 6 connected items per person on earth.\n",
//             "body": "<h2>Background</h2><p>To put IoT things into perspective, \"Industry 1.0\" started in the 1780's and was driven by mechanisation and steam power. \"Industry 2.0\" started around 1870 and was driven by the introduction of mass production techniques and electrical power. It was then followed by \"Industry 3.0\" in the late 1960's, which was driven by automation and electronics. We have now already entered Industry 4.0, which is characterised by cyber-physical systems, networks, and IoT. With pervasive connectivity, coupled with fast developments in artificial intelligence, both technical and cultural evolution are likely to become even more interesting going forward.</p><p>In monetary terms, B2B spending on IoT technologies, applications, and solutions is expected to reach €250 billion by 2020. Between 2015 and 2020, The Boston Consulting Group predicts that revenue from all layers of the IoT technology stack (software, connectivity, cloud, apps) will have at least a 20% compound annual growth rate.</p><p>By 2020, 50% of IoT spending will likely be driven by discrete manufacturing, transportation and logistics, and utilities. Predictive maintenance, self-optimising production, and automated inventory management are the top three use cases driving IoT market growth through to 2020.</p><h2>Impacts</h2><p>IoT will lead to systemic change that will requires new mindsets and a higher agility within organizations. In business terms, both value creation and value capture will be different. For example, not only current but also emergent customer needs must be addressed in real time and in a proactive way.</p><p>Going forward, it might no longer enough to develop, make, and sell standalone products that become obsolete with time. People and businesses expect product refreshes through over-the-air updates, with minimal disruption and hassle. This will continue the push for organizations to pursue a recurring revenue model instead of (or in addition to) point transactions.</p><p>The increasing capabilities of smart, connected products is expanding and reshaping industry boundaries. This interconnectedness will demand that companies understand and manage their industry and business processes on a high-level. It might become increasingly important to zoom out and understand other players' businesses and priorities in the marketspace to find and exploit complementary partnerships.</p><h3>Additional Information</h3><ul><li>Michael Porter &amp; James Heppelmann, ”How Smart, Connected Products Are Transforming Competition”. Harvard Business Review. <a href=\"https://hbr.org/2014/11/how-smart-connected-products-are-transforming-competition\" target=\"_blank\">https://hbr.org/2014/11/how-smart-connected-products-are-transforming-competition</a></li><li>Dave Evans, ”The Internet of Things: How the Next Evolution of the Internet Is Changing Everything”. Cisco. <a href=\"https://www.cisco.com/c/dam/en_us/about/ac79/docs/innov/IoT_IBSG_0411FINAL.pdf\" target=\"_blank\">https://www.cisco.com/c/dam/en_us/about/ac79/docs/innov/IoT_IBSG_0411FINAL.pdf</a></li><li>Tushar Bhatia et al., ”How tech giants deliver outsized returns—and what it means for the rest of us”.McKinsey. <a href=\"https://www.mckinsey.com/industries/high-tech/our-insights/how-tech-giants-deliver-outsized-returns-and-what-it-means-for-the-rest-of-us\" target=\"_blank\">https://www.mckinsey.com/industries/high-tech/our-insights/how-tech-giants-deliver-outsized-returns-and-what-it-means-for-the-rest-of-us</a></li><li>Ramo, J. C. (2016). The Seventh Sense: Power, Fortune, and Survival in the Age of Networks. Little, Brown. Beyene, Y. D., et al. (2017). NB-IoT technology overview and experience from cloud-RAN implementation. IEEE wireless communications, 24(3), 26-32.</li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/QSIPNhOiMoE?start=4",
//                 "image": "",
//                 "text": "How It Works: Internet of Things, IBM Think Academy"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "29eb77f5-6443-4714-827a-f4edb2e96881"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "85.0000000000000000",
//             "median": 85,
//             "values": [
//                 85
//             ]
//         },
//         "rating_y": {
//             "avg": "77.0000000000000000",
//             "median": 77,
//             "values": [
//                 77
//             ]
//         },
//         "ratingCurrentX": 85,
//         "ratingCurrentY": 77
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "f6c2ecc4-447f-4dab-882c-aa121ff6e41a",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2019-02-05T12:12:44.000Z",
//         "created_at": "2019-02-05T12:12:44.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Whole Life Inside City Interiors",
//             "short_title": "Life Indoors",
//             "summary": "In the process of societies becoming wealthier, more and more people learn to see urban outdoors as overcrowded, filthy, surrounded by unsocial behaviour, and being on mercy of harsh weather. As people seek better life quality, our services, leisure time, and the whole city life are steadily relocated into well-controlled, airconditioned, and more pleasant interiors.\n",
//             "body": "<h3>Additional Information</h3><ul><li>Kai Schultz, Hari Kumar &amp; Jeffrey Gettlemannov, ”In India, Air So Dirty Your Head ”. The New York Times. <a href=\"https://www.nytimes.com/2017/11/08/world/asia/india-air-pollution.html\" target=\"_blank\">https://www.nytimes.com/2017/11/08/world/asia/india-air-pollution.html</a></li><li>”10 MOST AMAZING Underground Cities”. Top10Archive. <a href=\"https://youtu.be/bWgaCQPew04\" target=\"_blank\">https://youtu.be/bWgaCQPew04</a></li><li>”10 Incredible Structures Built Underwater”. The Richest. <a href=\"https://youtu.be/H0r1bPOmil0\" target=\"_blank\">https://youtu.be/H0r1bPOmil0</a></li><li>Lucy Wang, \"New municipal building in Stockholm will look and act just like a greenhouse\". Inhabitat. <a href=\"https://inhabitat.com/could-stockholms-new-greenhouse-building-end-boring-municipal-design/\" target=\"_blank\">https://inhabitat.com/could-stockholms-new-greenhouse-building-end-boring-municipal-design/</a></li><li>Tafline Laylin,\"Giant bubble “greenhouse” covers this lush new retail center in Turkey\". Inhabitat. <a href=\"https://inhabitat.com/giant-bubble-greenhouse-covers-this-lush-new-retail-center-in-turkey/\" target=\"_blank\">https://inhabitat.com/giant-bubble-greenhouse-covers-this-lush-new-retail-center-in-turkey/</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/X9GKvfsXa0w",
//                 "image": "",
//                 "text": "Best Documentary 2016 The World's Most Amazing Underground City, Quest, Siver Lande"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "40436d80-fc56-4e57-9be0-5a88e3055368"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "85.0000000000000000",
//             "median": 85,
//             "values": [
//                 85
//             ]
//         },
//         "rating_y": {
//             "avg": "77.0000000000000000",
//             "median": 77,
//             "values": [
//                 77
//             ]
//         },
//         "ratingCurrentX": 85,
//         "ratingCurrentY": 77
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "a8b4ca12-2ab2-47f0-87ac-a32656b862ef",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-10-15T09:22:50.000Z",
//         "created_at": "2018-10-15T09:22:50.000Z",
//         "content": {
//             "type": "9c7a97a7-3650-45f9-9ab4-a489a5970506",
//             "title": "Keys",
//             "short_title": "Keys",
//             "summary": "Fingerprint scanning is already becoming common in electronic door locks. Conventional keys that open door locks will first start disappearing from higher security locations and soon after from offices, cars and even homes. Physical keys will eventually be replaced by biometric and multi-layered security solutions.\n",
//             "body": "<h2>Background</h2><p>Current key and pin number security are undermined by 3D printing and phishing. There are several instructions on-line for 3D printing house and car keys. Furthermore, students at The MIT have come up with a system how to copy and print more advanced keys.</p><p>Pin number based locks and ATM machines are quite easy to monitor and therefore are vulnerable to theft. These locking methods may still remain, but will be combined with some level of biometrics or mobile phone application to provide higher level of security.</p><h2>Impacts</h2><p>Conventional key manufacturers may soon be out of business, unless they provide multi-layered security using biometrics or other additional trust. It is possible that Internet Security sector, and locking and access safety for cars, homes and other physical assets will merge into one business sector.</p><h3>Additional information</h3><ul><li>Vlad Mitrache, ”BMW Executive Dreams of a Keyless Car Future”. Autoevolution. <a href=\"https://www.autoevolution.com/news/bmw-executive-dreams-of-a-keyless-car-future-120462.html\" target=\"_blank\">https://www.autoevolution.com/news/bmw-executive-dreams-of-a-keyless-car-future-120462.html</a></li><li>”Copy a Car Key with a 3D Printer”. Smithallen Studio, Instructables. <a href=\"http://www.instructables.com/id/Copy-a-Car-Key-with-a-3D-Printer/\" target=\"_blank\">http://www.instructables.com/id/Copy-a-Car-Key-with-a-3D-Printer/</a></li><li>Adam Clark Estes, ”You Can Now 3D-Print Your Own TSA Master Keys”. Gizmodo. <a href=\"http://gizmodo.com/you-can-now-3d-print-your-own-tsa-master-keys-1730134042\" target=\"_blank\">http://gizmodo.com/you-can-now-3d-print-your-own-tsa-master-keys-1730134042</a></li><li>Andy Greenberg, ”MIT Students Release Program To 3D-Print High Security Keys”. Forbes. <a href=\"http://www.forbes.com/sites/andygreenberg/2013/08/03/mit-students-release-program-to-3d-print-high-security-keys/#2284f26e2da5\" target=\"_blank\">http://www.forbes.com/sites/andygreenberg/2013/08/03/mit-students-release-program-to-3d-print-high-security-keys/#2284f26e2da5</a></li><li>Andy Greenberg, ”This App Lets Anyone 3-D Print ‘Do-Not-Duplicate’ Keys”. The Wired. <a href=\"https://www.wired.com/2015/08/this-app-lets-anyone-3-d-print-do-not-duplicate-keys/\" target=\"_blank\">https://www.wired.com/2015/08/this-app-lets-anyone-3-d-print-do-not-duplicate-keys/</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/362-WE_oE3Y?start=48",
//                 "image": "",
//                 "text": "August Smart Lock - The lock of the future, Creating the World"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "7faeace9-f516-4f78-af90-2e2f340ce04e"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "cooling",
//         "content-type-title": "Weakening",
//         "color": "none",
//         "rating_x": {
//             "avg": "83.0000000000000000",
//             "median": 83,
//             "values": [
//                 83
//             ]
//         },
//         "rating_y": {
//             "avg": "77.0000000000000000",
//             "median": 77,
//             "values": [
//                 77
//             ]
//         },
//         "ratingCurrentY": 77,
//         "ratingCurrentX": 83
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "b45d64cb-cc31-4b87-8bd6-74003d197136",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-12-07T15:05:57.000Z",
//         "created_at": "2018-12-07T15:05:57.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "From Stores to Showrooms",
//             "short_title": "From Stores to Showrooms",
//             "summary": "The Internet and mobile technologies are changing consumer behaviour in physical stores. In the future, brands must invest more and more into a comprehensive and easy customer experience, which will require a more efficient combining of physical and digital service channels.\n",
//             "body": "<h2>Background</h2><p>The ease of searching the Internet for product information, reviews, and prices (webrooming) plays an increasing role in consumption behaviour and willingness to purchase in physical stores. Moreover, the vitality of physical retail locations is challenged by online shopping with its relatively inexpensive pricing.</p><p>Most customers still want to try and touch alternatives in a store before making the final purchase decision. However, this does not guarantee that the purchase is made in the store, even if the service is professional and well-liked. More and more people end up ordering the product online from a different vendor, who is capable of delivering a cheaper price or a wider variety of, for example, size or colour choices.</p><p>This is why many known brands have already begun transforming their stores more to showrooms where the traditional sales-purchase exchange is augmented by combining the best sides of physical and digital service channels (omnishopping), offering the customer the best possible shopping experience. The goal is to offer the customers a tailored, memorable, and easy shopping experience. Increasing attention is given to customer-centred service, which makes efficient use of digital resources.</p><h3>Additional Information</h3><ul><li>\"Omnichannel Retailing - The Digital Store of the Future\". Humberto Pelaez. <a href=\"https://www.youtube.com/watch?v=W8XLRZcUf1c\" target=\"_blank\">https://www.youtube.com/watch?v=W8XLRZcUf1c</a></li><li>”Glimpse the Store of the Future”. Bloomberg. <a href=\"https://youtu.be/wr28_Pmg1Ag\" target=\"_blank\">https://youtu.be/wr28_Pmg1Ag</a></li><li>Gerd Bovensiepen, Benedikt Schmaus &amp; Birger Maekelburger, \"The 2015 Global Omnichannel Retail Index\". PwC. <a href=\"http://www.strategyand.pwc.com/reports/2015-global-omnichannel-retail-index\" target=\"_blank\">http://www.strategyand.pwc.com/reports/2015-global-omnichannel-retail-index</a></li><li>Humayun Khan, \"Consumers Are Showrooming and Webrooming Your Business\". Shopify. <a href=\"https://www.shopify.com/retail/119920451-consumers-are-showrooming-and-webrooming-your-business-heres-what-that-means-and-what-you-can-do-about-it\" target=\"_blank\">https://www.shopify.com/retail/119920451-consumers-are-showrooming-and-webrooming-your-business-heres-what-that-means-and-what-you-can-do-about-it</a></li><li>Doug Stephens, \"The Future of Retail Is The End Of Wholesale\". Retail Prophet. <a href=\"http://www.retailprophet.com/uncategorized/the-future-of-retail-is-the-end-of-wholesale/\" target=\"_blank\">http://www.retailprophet.com/uncategorized/the-future-of-retail-is-the-end-of-wholesale/</a></li><li>\"Solving the Omni-channel Challenge with In-store Fulfillment\". HighJump. <a href=\"https://www.youtube.com/watch?v=o6CZ2cNM_Gk\" target=\"_blank\">https://www.youtube.com/watch?v=o6CZ2cNM_Gk</a></li><li>\"Retail Showrooming and ROPO\". GoSpotCheck. <a href=\"https://www.youtube.com/watch?v=gbYgiRvaotQ\" target=\"_blank\">https://www.youtube.com/watch?v=gbYgiRvaotQ</a></li><li>\"Zebra One Store –Customer-Centric Omni-channel Retail\". Zebra Technologies. <a href=\"https://www.youtube.com/watch?v=psfAFlg9BmY\" target=\"_blank\">https://www.youtube.com/watch?v=psfAFlg9BmY</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/VEBj9UI8YxQ?start=7",
//                 "image": "",
//                 "text": "The Future of Retail | The in-store experience, Synchrony Financial"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "622b2840-a8c5-4b81-9d56-3ebd3e926280"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "82.0000000000000000",
//             "median": 82,
//             "values": [
//                 82
//             ]
//         },
//         "rating_y": {
//             "avg": "76.0000000000000000",
//             "median": 76,
//             "values": [
//                 76
//             ]
//         },
//         "ratingCurrentX": 82,
//         "ratingCurrentY": 76
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "39ae4ecd-56bb-496d-9d95-a2538f84b90f",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1924,
//         "updated_at": "2020-04-24T07:53:40.187Z",
//         "created_at": "2019-03-19T06:51:02.000Z",
//         "content": {
//             "type": "9c7a97a7-3650-45f9-9ab4-a489a5970506",
//             "title": "Road Deaths and Car Repairs",
//             "short_title": "Road Deaths and Car Repairs",
//             "summary": "<p>In the future, road traffic will be extremely safe due to autonomous vehicles. At the same time the need to repair and service cars will radically decrease.</p>",
//             "body": "<h2>Background</h2><p>Traffic costs an estimated 1.3 million lives in the world every year. Nearly all of the accidents are caused by human error or, for example, driving under the influence.</p><p>Autonomous vehicles are better at identifying risks and react quicker than human beings. Moreover, they communicate with one another and optimise traffic, creating a smooth and quick system with no unnecessary gaps or breaks and no need to slow down for intersections.</p><p>Due to the durability of parts and the electric motor, autonomous electric vehicles have no need for oil changes and little demand for spare parts. This fact combined with the decrease in accidents has direct impacts to garages and car sales. Currently oil changes constitute a surprisingly large share of garages' gross profits.</p><h3>Additional Information</h3><ul><li>John Thornhill, ”Driverless cars may kill off the world’s deadliest invention”. The Financial Times. <a href=\"https://www.ft.com/content/d4d1a97a-d34b-11e7-a303-9060cb1e5f44\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.ft.com/content/d4d1a97a-d34b-11e7-a303-9060cb1e5f44</a></li><li>”Autonomous Cars to Be in Production by 2021”. BMW Group. <a href=\"https://news.bmw.co.uk/article/autonomous-cars-to-be-in-production-by-2021/\" rel=\"noopener noreferrer\" target=\"_blank\">https://news.bmw.co.uk/article/autonomous-cars-to-be-in-production-by-2021/</a></li><li>\"Autonomous Cars Are Coming And You Can’t Have One (0:17–)\". HowStuffWorks. <a href=\"https://www.youtube.com/watch?v=RsftP3_g89U\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.youtube.com/watch?v=RsftP3_g89U</a></li><li>\"10 million self-driving cars will be on the road by 2020\". Business Insider. <a href=\"http://www.businessinsider.com/report-10-million-self-driving-cars-will-be-on-the-road-by-2020-2015-5-6?r=US&amp;IR=T&amp;IR=T\" rel=\"noopener noreferrer\" target=\"_blank\">http://www.businessinsider.com/report-10-million-self-driving-cars-will-be-on-the-road-by-2020-2015-5-6?r=US&amp;IR=T&amp;IR=T</a></li><li>Adrienne Lafrance, \"Self-Driving Cars Could Save 300,000 Lives Per Decade in America\". The Atlantic. <a href=\"http://www.theatlantic.com/technology/archive/2015/09/self-driving-cars-could-save-300000-lives-per-decade-in-america/407956/\" rel=\"noopener noreferrer\" target=\"_blank\">http://www.theatlantic.com/technology/archive/2015/09/self-driving-cars-could-save-300000-lives-per-decade-in-america/407956/</a></li><li>Alex Hern, \"Car hacking is the future\". The Guardian. <a href=\"https://www.theguardian.com/technology/2016/aug/28/car-hacking-future-self-driving-security\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.theguardian.com/technology/2016/aug/28/car-hacking-future-self-driving-security</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/P1tfOeChenQ?start=178",
//                 "image": "",
//                 "text": "The Future of Driverless Cars, The Daily Conversation"
//             },
//             "time_range": {
//                 "min": 2020,
//                 "max": 2023
//             },
//             "related_phenomena": [
//                 "4678aaf5-fafb-4b18-9f64-2eea9453d604",
//                 "82b1845e-b869-414d-8449-af718dc9f560",
//                 "fc815d84-f3a5-4d83-8f67-1c87467cbe19",
//                 "30da7f9a-4888-4b29-8e9c-e0a27bffe0b8",
//                 "8895a693-f354-4a39-a225-0e4221b6d999",
//                 "91055d26-88de-4878-9018-8d43d2b43880",
//                 "e2a69524-24a5-4098-baaa-f4b889014d2b",
//                 "84483045-08d4-48b9-a12f-36384a6b02f0",
//                 "ee3bada4-c9b4-49b6-9c5c-4c3d46fdb3d1"
//             ],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "e71d36c6-08c9-4355-bacd-6316a3327f5f"
//             ],
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "cooling",
//         "content-type-title": "Weakening",
//         "color": "none",
//         "rating_x": {
//             "avg": "83.0000000000000000",
//             "median": 83,
//             "values": [
//                 83
//             ]
//         },
//         "rating_y": {
//             "avg": "74.0000000000000000",
//             "median": 74,
//             "values": [
//                 74
//             ]
//         },
//         "ratingCurrentX": 83,
//         "ratingCurrentY": 74
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "35c32204-9885-42a3-bf8a-361c0e6e535a",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1924,
//         "updated_at": "2020-04-24T07:52:50.511Z",
//         "created_at": "2019-03-19T07:53:13.000Z",
//         "content": {
//             "type": "474ead6c-06c4-46a9-bf9f-258682108888",
//             "title": "SpiNNAker Supercomputer",
//             "short_title": "SpiNNAker Supercomputer",
//             "summary": "<p>SpiNNaker (Spiking Neural Network Architecture) is a neuromorphic supercomputer, which means its structure and functions imitate those of a human brain. SpiNNaker consists of over a million processor cores mimicking the brain’s neural network. Indeed, the supercomputer is hoped to offer new opportunities for brain research. SpiNNaker is located in the University of Mancherster and it is part of the Human Brain Project.</p>",
//             "body": "<h3>Additional Information</h3><ul><li>Edd Gent, ”The SpiNNaker supercomputer, modeled after the human brain, is up and running”. Singularity Hub. <a href=\"https://singularityhub.com/2018/11/19/the-million-core-spinnaker-supercomputer-is-up-and-running/#sm.000vy8sqcaryej310gi2apwoxesmu\" rel=\"noopener noreferrer\" target=\"_blank\">https://singularityhub.com/2018/11/19/the-million-core-spinnaker-supercomputer-is-up-and-running/#sm.000vy8sqcaryej310gi2apwoxesmu</a></li><li>Robin Mitchell, ”SpiNNaker, the million-core supercomputer, finally switched on”. All About Circuits. <a href=\"https://www.allaboutcircuits.com/news/simulate-human-brain-spinnaker-million-core-computer-switched-on/\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.allaboutcircuits.com/news/simulate-human-brain-spinnaker-million-core-computer-switched-on/</a></li><li>”World’s largest brain-like supercomputer switched on for first time”. The Economic Times. <a href=\"https://economictimes.indiatimes.com/industry/miscellaneous/worlds-largest-brain-like-supercomputer-switched-on-for-first-time/spinnaker-worlds-largest-brain-like-supercomputer/slideshow/66586789.cms\" rel=\"noopener noreferrer\" target=\"_blank\">https://economictimes.indiatimes.com/industry/miscellaneous/worlds-largest-brain-like-supercomputer-switched-on-for-first-time/spinnaker-worlds-largest-brain-like-supercomputer/slideshow/66586789.cms</a></li><li>Dario Broghino, ”Million-core neuromorphic supercomputer could simulate an entire mouse brain”. New Atlas. <a href=\"https://newatlas.com/spinnaker-neuromorphic-supercomputer-mouse-brain-simulation/57101/\" rel=\"noopener noreferrer\" target=\"_blank\">https://newatlas.com/spinnaker-neuromorphic-supercomputer-mouse-brain-simulation/57101/</a></li></ul>",
//             "media": {
//                 "video": "https://www.youtube.com/embed/TetLY4gPDpo?start=189",
//                 "image": "",
//                 "text": "Neuromorphic Computing Is a Big Deal for A.I., But What Is It?, Seeker"
//             },
//             "time_range": {
//                 "min": 2020,
//                 "max": 2023
//             },
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [],
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "weaksignal",
//         "content-type-title": "Weak signal",
//         "color": "none",
//         "rating_x": {
//             "avg": "83.0000000000000000",
//             "median": 83,
//             "values": [
//                 83
//             ]
//         },
//         "rating_y": {
//             "avg": "73.0000000000000000",
//             "median": 73,
//             "values": [
//                 73
//             ]
//         },
//         "ratingCurrentY": 73,
//         "ratingCurrentX": 83
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "1dd70f78-b3b2-4a04-b82a-f038bc22891b",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-12-10T12:03:36.000Z",
//         "created_at": "2018-12-10T12:03:36.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Telediagnostics, Remote Maintenance & Remote Upkeep",
//             "short_title": "Telediagnostics, Maintenance +Upkeep",
//             "summary": "People are increasingly rarely needed on location to fix malfunctioning or broken equipment. Combined with the development of the Internet of Things, telediagnosed machinery can often be serviced or at least the error analysed remotely.",
//             "body": "<h2>Background</h2><p>The tools for remote diagnosis, repair, and maintenance are developing at an accelerating pace. Telediagnosis is based on data gathered regarding the functioning of the equipment and on analysing the gathered data with artificial intelligence solutions. Once a problem has been identified, software-based faults can be fixed remotely.</p><p>In the future, one interesting field of remote maintenance will be built around combining augmented reality and robotics.</p><h3>Additional Information</h3><ul><li>“ABB Drives Remote Condition Monitoring helps in maintenance planning and improves risk management”. ABB. <a href=\"https://www.youtube.com/watch?v=tES-dRfJ6SM\" target=\"_blank\">https://www.youtube.com/watch?v=tES-dRfJ6SM</a></li><li>“JRC's Remote Maintenance System”. JcrEurope. <a href=\"https://youtu.be/da_uu9IgbA8\" target=\"_blank\">https://youtu.be/da_uu9IgbA8</a></li><li>”Kemppi X8 – Change is here in industrial MIG/MAG welding”. Kemppi Oy. <a href=\"https://youtu.be/Zn255oPx6gM\" target=\"_blank\">https://youtu.be/Zn255oPx6gM</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/lnxkeDYj45w",
//                 "image": "",
//                 "text": "Augmented Reality Remote Maintenance, Viscopic"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "972d164b-1ea0-44b0-94db-23df2aaa002e"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "71.0000000000000000",
//             "median": 71,
//             "values": [
//                 71
//             ]
//         },
//         "rating_y": {
//             "avg": "73.0000000000000000",
//             "median": 73,
//             "values": [
//                 73
//             ]
//         },
//         "ratingCurrentX": 71,
//         "ratingCurrentY": 73
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "3c6740a9-d698-4887-be53-851f6db737f4",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2019-02-11T09:25:34.000Z",
//         "created_at": "2019-02-11T09:25:34.000Z",
//         "content": {
//             "type": "bf127402-abbe-42e7-b3c5-a8e46c76cfb0",
//             "title": "Ecoskyscrapers Built from Recycled Material",
//             "short_title": "Ecoskyscrapers",
//             "summary": "According to a design that won an architectural contest, it is conceivable to build a complete skyscraper using recycled waste, even in such a way that the whole building lives and grows according to the changing needs of its residents. When realised, this plan may indicate the beginning of a larger urban construction trend, where urban waste is transformed into building materials by using innovative technologies.\n",
//             "body": "<h2>Background</h2><p>Architect Thomas Corbasson has together with the VS-A design team co-planned a design of a completely new kind of organic or \"living\" skyscraper.</p><p>The starting point of an organic skyscraper is to take recycling seriously, in other words, to form the entire building, along with its support frames and facades, solely out of trash that would otherwise end up in a landfill. The living aspect of the building implies that new floors and flats can be built from the waste produced by the residents, as the need for new space emerges.</p><p>In addition, the building has plant life for food production as well as for enhancing comfort. It also produces part of its energy with wind power. The plan received an honorable mention in the architectural contests called Skyscrapers and SuperSkyscrapers Competition. The first pilot building is planned to be built in London.</p><h3>Additional Information</h3><ul><li>Katherine Brooks, ”This Organic Skyscraper Is Designed To Literally Grow As Its Residents Recycle\". HuffPost. <a href=\"https://www.huffingtonpost.com/2014/07/17/organic-skyscraper_n_5592690.html\" target=\"_blank\">https://www.huffingtonpost.com/2014/07/17/organic-skyscraper_n_5592690.html</a></li><li>Connor Walker, ”Organic London Skyscraper Grows as Residents Recycle”. Archdaily. <a href=\"https://www.archdaily.com/524225/organic-london-skyscraper-grows-as-residents-recycle\" target=\"_blank\">https://www.archdaily.com/524225/organic-london-skyscraper-grows-as-residents-recycle</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/7_rGaby9aBg?start=5",
//                 "image": "",
//                 "text": "Organic Skyscraper London Chartier-Corbasson architects, Griya Grace"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "63b615ab-5961-4c3d-ae7b-49c5b82e1af7"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "wildcard",
//         "content-type-title": "Wild card",
//         "color": "none",
//         "rating_x": {
//             "avg": "69.0000000000000000",
//             "median": 69,
//             "values": [
//                 69
//             ]
//         },
//         "rating_y": {
//             "avg": "73.0000000000000000",
//             "median": 73,
//             "values": [
//                 73
//             ]
//         },
//         "ratingCurrentY": 73,
//         "ratingCurrentX": 69
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "c7a0a86b-5f10-4618-a42b-bda8d77b0a99",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2019-03-06T14:09:46.000Z",
//         "created_at": "2019-03-06T14:09:46.000Z",
//         "content": {
//             "type": "bf127402-abbe-42e7-b3c5-a8e46c76cfb0",
//             "title": "Social Ranking Systems",
//             "short_title": "Social Ranking Systems",
//             "summary": "A social ranking system refers to a register, in which each customer or citizen has their own balance of points, which changes in real time based, for example, on their purchasing behaviour or adherence to laws. As the first country in the world, China is introducing a social ranking system to monitor its citizens. Similar, state-run ranking systems or a voluntary, business owned systems, may also be proposed in the west.",
//             "body": "<h2>Background</h2><p>The Chinese government is planning to launch the Social Credit Score (SCS) system by 2020. In practice, they are trying to build a system that uses a large variety of data, such as financial, legal, and social information, to produce algorithm-based citizen scores of trustworthiness. As a result, an all-compassing social ranking system is established. The system will most likely be connected to the facial recognition system covering the entire country, which makes it impossible to move through a public space without being recognised.</p><p>The Chinese government rolled out the first plans of the SCS in 2014 and voluntary implementation has already started. Development has begun with the co-operation of eight private companies. It will be mandatory for all residents, legal persons (including companies), and other entities by 2020.</p><p>These partner companies include data giants like Sesame Credit and China Rapid Finance who have access to large quantities of diverse data. For instance, Sesame Credit’s SCS system rates people according five factors: credit history, obligation fulfilment capacity, personal characteristics, behaviour and preferences, and interpersonal relationships. As a result, an individual will be given a citizen score between 350 and 950 points.</p><p>The system is designed to reward well-rated individuals by giving them access to better and cheaper services, financing, premium leisure services, and education options for their children. In turn, the list of suggested penalties for those with lower scores ranges from lost access to social security benefits and stricter customs checks to withholding train or plane tickets or passports. Individuals with low scores will also not be able to hold a public office or some senior-level positions.</p><p>Ranking systems are gaining a foothold in the west also, at least in small scale. The sharing economy platforms try to build trust between the user and the provider through transparent evaluation and ranking. For example, Airbnb and Uber are utilising a ranking system in their service, in which the customer can, for instance, rate the service with one to five stars. Based on ratings, the Uber drivers or the Airbnb landlords can be punished, or they can be excluded from the service altogether. In a similar vein, a customer that have received bad ratings from their drivers or landlords may find it more difficult to obtain service in the future.</p><h2>Impacts</h2><p>The Chinese government has stated that the main goal of the system is to create a culture of sincerity and enhance the whole society's credibility. By implementing this type of system, China hopes to strengthen its economy and financial sector.</p><p>China’s plan has spurred a global discussion and been subject to wide-spread criticism. It is feared that it might lead towards a Big Brother world, as described in George Orwell’s dystopian novel \"1984\", or a future world in which people’s lives are dominated by social ratings as portrayed in Black Mirror's episode \"Nosedive\".</p><p>There are also supporting arguments backing up the developments of these kinds of systems. Those in favour argue that if done right, there could be significant benefits in terms of building trust and transparency in societies. The culture of continuous monitoring and rating is growing, and it’s possible that similar social ranking systems could gain wider popularity and acceptance all over the world.</p><h3>Additional Information</h3><ul><li>Tara Francis Chan, “China’s social credit system has blocked people form taking 11 million flights and 4 million train trips”. Business Insider. <a href=\"https://nordic.businessinsider.com/china-social-credit-system-blocked-people-taking-flights-train-trips-2018-5/\" target=\"_blank\">https://nordic.businessinsider.com/china-social-credit-system-blocked-pe...</a></li><li>“Exposing China’s digital dystopian dictatorship | Foreign Correspondent”. ABC News (Australia). <a href=\"https://www.youtube.com/watch?v=eViswN602_k\" target=\"_blank\">https://www.youtube.com/watch?v=eViswN602_k</a></li><li>Matthew Carney, “Leave no dark corner”. ABC. <a href=\"http://www.abc.net.au/news/2018-09-18/china-social-credit-a-model-citizen-in-a-digital-dictatorship/10200278\" target=\"_blank\">http://www.abc.net.au/news/2018-09-18/china-social-credit-a-model-citize...</a></li><li>Rachel Botsman, ”Big data meets Big Brother as China moves to rate its citizens”. Wired. <a href=\"http://www.wired.co.uk/article/chinese-government-social-credit-score-privacy-invasion\" target=\"_blank\">http://www.wired.co.uk/article/chinese-government-social-credit-score-privacy-invasion</a></li><li>Clinton Nguyen, ”China might use data to create a score for each citizen based on how trustworthy they are”. Business Insider. <a href=\"http://www.businessinsider.com/china-social-credit-score-like-black-mirror-2016-10\" target=\"_blank\">http://www.businessinsider.com/china-social-credit-score-like-black-mirror-2016-10</a></li><li>Amulya Shankar, ”What's your citizen 'trust score'? China moves to rate its 1.3 billion citizens”. USA Today. <a href=\"https://www.usatoday.com/story/news/world/2017/11/10/whats-your-citizen-trust-score-china-moves-rate-its-1-3-billion-citizens/851365001/\" target=\"_blank\">https://www.usatoday.com/story/news/world/2017/11/10/whats-your-citizen-trust-score-china-moves-rate-its-1-3-billion-citizens/851365001/</a></li><li>Jonathan Margolis, ”A Big Brother approach has qualities that would benefit society”. Financial Times. <a href=\"https://www.ft.com/content/ffe78e52-bd54-11e7-823b-ed31693349d3\" target=\"_blank\">https://www.ft.com/content/ffe78e52-bd54-11e7-823b-ed31693349d3</a></li><li>”Nineteen Eighty-Four, 1984, novel by George Orwell”. Wikipedia. <a href=\"https://en.wikipedia.org/wiki/Nineteen_Eighty-Four\" target=\"_blank\">https://en.wikipedia.org/wiki/Nineteen_Eighty-Four</a></li><li>Sophie Gilbert, ”Black Mirror’s ‘Nosedive’ Skewers Social Media”. The Atlantic. <a href=\"https://www.theatlantic.com/entertainment/archive/2016/10/black-mirror-nosedive-review-season-three-netflix/504668/\" target=\"_blank\">https://www.theatlantic.com/entertainment/archive/2016/10/black-mirror-nosedive-review-season-three-netflix/504668/</a></li><li>Alexandra Ma, \"China reportedly made an app to show people if they're walking near someone in debt — a new part of its intrusive 'social credit' policy\". Business Insider. <a href=\"https://nordic.businessinsider.com/china-app-shows-map-of-people-in-debt-for-social-credit-system-report-2019-1?r=US&amp;IR=T\" target=\"_blank\">https://nordic.businessinsider.com/china-app-shows-map-of-people-in-debt-for-social-credit-system-report-2019-1?r=US&amp;IR=T</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/wyMOcD9Pd28?start=39",
//                 "image": "",
//                 "text": "China’s “Social Credit Score” to rank citizens’ “trustworthiness”, Rebel Canada"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "7dddaa88-5b41-4b85-84c5-69cedbca08c0"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "wildcard",
//         "content-type-title": "Wild card",
//         "color": "none",
//         "rating_x": {
//             "avg": "85.0000000000000000",
//             "median": 85,
//             "values": [
//                 85
//             ]
//         },
//         "rating_y": {
//             "avg": "72.0000000000000000",
//             "median": 72,
//             "values": [
//                 72
//             ]
//         },
//         "ratingCurrentX": 85,
//         "ratingCurrentY": 72
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "a96f9455-45ec-4086-95b9-e8e0eb3c8f75",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1,
//         "updated_at": "2020-04-24T07:51:36.229Z",
//         "created_at": "2019-12-12T19:29:57.000Z",
//         "content": {
//             "type": "bf127402-abbe-42e7-b3c5-a8e46c76cfb0",
//             "title": "test123",
//             "short_title": "test123",
//             "summary": "<p>qweqwe</p>",
//             "body": "<p>test</p>",
//             "media": {
//                 "video": "test",
//                 "image": "",
//                 "text": "test"
//             },
//             "time_range": {
//                 "min": 2020,
//                 "max": 2023
//             },
//             "related_phenomena": [
//                 "a96f9455-45ec-4086-95b9-e8e0eb3c8f75",
//                 "aa2ef169-bfbb-40fc-bbb3-762cbbe4a973",
//                 "ba629f00-8b35-40ee-ba88-fa75598a5c4a",
//                 "10f45f48-5e25-428c-a37e-4b0b34cb6048",
//                 "35c32204-9885-42a3-bf8a-361c0e6e535a",
//                 "b3dd6b7e-5c12-4dd0-a0d8-f1b9728245aa"
//             ],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "008d4082-b511-4805-bfdb-e77eb160b2f4",
//                 "00a07772-8ba0-4d03-b4cc-e264428a37b8",
//                 "009a33c2-59d6-43e9-b399-402553fa49f0"
//             ],
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "wildcard",
//         "content-type-title": "Wild card",
//         "color": "none",
//         "rating_x": {
//             "avg": "21.0000000000000000",
//             "median": 21,
//             "values": [
//                 21
//             ]
//         },
//         "rating_y": {
//             "avg": "72.0000000000000000",
//             "median": 72,
//             "values": [
//                 72
//             ]
//         },
//         "ratingCurrentX": 21,
//         "ratingCurrentY": 72
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "f5e917e6-5d57-4b25-81f1-405c2da66c03",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2019-02-11T15:07:37.000Z",
//         "created_at": "2019-02-11T15:07:37.000Z",
//         "content": {
//             "type": "474ead6c-06c4-46a9-bf9f-258682108888",
//             "title": "Young Retirees",
//             "short_title": "Young Retirees",
//             "summary": "Many young people have publicly stated they aim to retire at an early age. Instead of continuing a successful career, they attempt to accumulate enough savings to allow for economic independence for the rest of their lives.",
//             "body": "<h2>Background</h2><p>For generations work has been of great importance to peoples' lives. Working has generally been considered a respectful undertaking and a responsibility for those in the working age. Work motivation has not only been driven by the need to earn an income, but it has also been seen as an important venue for self expression and a means to create a purpose for life. However, the traditional work ethos is changing as new kinds of values and attitudes emerge. Concrete examples of this are well performing employees and entrepreneurs young adults who openly state they aim to retire in their 30s or early 40s.</p><p>These young people attempt to reach their goals through moderate consumption, unlevered possessions, savings, and investments. They are motivated by the freedom to use their time to things they regard important, which economic independence can offer even if it means living constantly on a tight budget. Work or employment are not central parts of their identity and they do not view continuous accumulation of wealth or updating of material possessions as key factors of happiness.</p><p>Even though all of these young adults do not completely rule out the possibility of working at some point in the future, their primary desire is to be able to make choices without compelling economic restraints. Some of the young who have been in the public eye have already realised their dream and have openly documented their story online, providing concrete hints for their followers who wish to achieve the same goal.</p><h3>Additional Information</h3><ul><li>Anna Bahney, \"She retired at 28 with $2.25 million\". CNN Money. <a href=\"http://money.cnn.com/2017/08/02/pf/early-retirement/index.html\" target=\"_blank\">http://money.cnn.com/2017/08/02/pf/early-retirement/index.html</a></li><li>Anna Bahney, This couple is on track to retire -- before they turn 40\". CNN Money. <a href=\"http://money.cnn.com/2017/06/05/retirement/retire-early/index.html\" target=\"_blank\">http://money.cnn.com/2017/06/05/retirement/retire-early/index.html</a></li><li>Julia Ramper, \"Meet the thrifty savers retiring in their 30s and 40s\". Mirror. <a href=\"http://www.mirror.co.uk/money/meet-thrifty-savers-retiring-30s-6533112\" target=\"_blank\">http://www.mirror.co.uk/money/meet-thrifty-savers-retiring-30s-6533112</a></li><li>Mr. Money Mustache, \"Early Retirement through Badassity\". Mr. Money Mustache. <a href=\"http://www.mrmoneymustache.com/\" target=\"_blank\">http://www.mrmoneymustache.com/</a></li><li>Joe Udo, \"Start Here\". Retire By 40. <a href=\"http://retireby40.org/resources/\" target=\"_blank\">http://retireby40.org/resources/</a></li><li>Thomas Smale, \"5 Lessons From People Who Retired at 40\". Entrepreneur. <a href=\"https://www.entrepreneur.com/article/270290\" target=\"_blank\">https://www.entrepreneur.com/article/270290</a></li></ul>",
//             "media": {
//                 "video": "https://www.youtube.com/embed/vvJ4bwnAHnE?start=30",
//                 "image": "",
//                 "text": "How 'Mr. Money Moustache' Retired at Age 30, ABC News"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "3c97c553-02c8-49c3-b026-3e6fdc3698c3"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "weaksignal",
//         "content-type-title": "Weak signal",
//         "color": "none",
//         "rating_x": {
//             "avg": "67.0000000000000000",
//             "median": 67,
//             "values": [
//                 67
//             ]
//         },
//         "rating_y": {
//             "avg": "71.0000000000000000",
//             "median": 71,
//             "values": [
//                 71
//             ]
//         },
//         "ratingCurrentX": 67,
//         "ratingCurrentY": 71
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "6e76bd8f-a579-4cf3-ab28-286ca3135a8b",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-09-11T09:52:48.000Z",
//         "created_at": "2018-09-11T09:52:48.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Artificial & Robot Co-workers",
//             "short_title": "Artificial +Robot CoWorkers",
//             "summary": "Estimations of how much of contemporary human work could be fully automated in the next few decades vary from five to 70 per cent. Just as great variation can be found in estimations of how much new work appears as a result. In the most likely future, automation and human labour form increasingly efficient teams and jobs are lost at an increasing pace and new usages for human labour are found.",
//             "body": "<h2>Background</h2><p>Automation and robotics have significantly transformed manufacturing already for decades. While there are recent advances in robotics, a more radical shift has taken place in algorithms that can take over knowledge work and the processes of monitoring automated production. In some cases this translates into loss of jobs, but generally speaking work is changing towards cooperation with robots and automated software.</p><p>A study by US management consulting firm McKinsey estimates that the financial benefit in implementing further automation in the industry may yield three to ten times the cost. It also notes that if machine learning can produce natural language perception and production at median human level, a further 13 percent of current work tasks can be automated in the US. Further, the study confirms that tacit knowledge and experience are immune to automation.</p><p>Examples of automated processes with robots and artificial intelligence include Kiva by Amazon: robots that act with other robots to plan how they should carry out their tasks at warehouses. The McKinsey study, which holds a modest estimation of technological unemployment, suggests that only 5 percent of current jobs could be replaced by automation, while up to 30 percent of tasks done by 60% of workforce could be automated. If this is the case, instead of disintegrating human jobs entirely, robots and automation will become our workmates, which, in turn, drastically changes the nature of work and the way teams operate.</p><p>The McKinsey study sees adding value to human labour: “As roles and processes get redefined, the economic benefits of automation will extend far beyond labour savings. Particularly in the highest-paid occupations, machines can augment human capabilities to a high degree, and amplify the value of expertise by increasing an individual’s work capacity and freeing the employee to focus on work of higher value.”</p><p>The study also paid attention to specific areas of human activities that are difficult to automate. Only 4 percent of US jobs were found to require creativity, and 29 percent to require a sense of human emotions. “While these findings might be lamented as reflecting the impoverished nature of our work lives, they also suggest the potential to generate a greater amount of meaningful work. This could occur as automation replaces more routine or repetitive tasks, allowing employees to focus more on tasks that utilize creativity and emotion.”</p><p>Bolder estimates state that better utilisation of automation based on already existing machinery and software could replace up to 45-47 % of current work. If this holds water, the potential of rapid technological development to replace human work could mean far greater technological unemployment.</p><p>Carl Benedikt Frey and Michael A. Osborne studied the impact of machine learning and mobile robotics on 702 different occupations. According to them, “… algorithms for big data are now rapidly entering domains reliant upon pattern recognition and can readily substitute for labour in a wide range of non-routine cognitive tasks”. While knowledge workers at large will be impacted by future automation, Benedikt and Osborne assert that, “most workers in transportation and logistics occupations, together with the bulk of office and administrative support workers, and labour in production occupations, are at risk.”</p><h2>Impacts</h2><p>Automation is likely to transform existing jobs by removing routine tasks, speeding up and adding quality to some tasks, and creating more space for creativity and insight in jobs assisted by AI software. There are several physical jobs that automation and robotics will replace, leading to technological unemployment, but also those that it will not be able to replace. It seems that while routine jobs are lost, they are replaced by more complex jobs that require creative ideation and a human interaction.</p><h3>Additional Information</h3><ul><li>Louise Lucas, ”Alibaba and Microsoft AI beat humans in Stanford reading test”. Financial Times. <a href=\"https://www.ft.com/content/8763219a-f9bc-11e7-9b32-d7d59aace167\" target=\"_blank\">https://www.ft.com/content/8763219a-f9bc-11e7-9b32-d7d59aace167</a></li><li>Chris Weller &amp; Skye Gould, ”This is when robots will start beating humans at every task”. World Economic Forum. <a href=\"https://www.weforum.org/agenda/2017/06/this-is-when-robots-will-start-beating-humans-at-every-task-ae5ecd71-5e8e-44ba-87cd-a962c2aa99c2\" target=\"_blank\">https://www.weforum.org/agenda/2017/06/this-is-when-robots-will-start-beating-humans-at-every-task-ae5ecd71-5e8e-44ba-87cd-a962c2aa99c2</a></li><li>Tiger Tyagarajan, ”AI killed 800,000 jobs in the U.K., but created 3.5 million new ones”. Venture Beat. <a href=\"https://venturebeat.com/2017/06/14/ai-killed-800000-jobs-in-the-u-k-but-created-3-5-million-new-ones/\" target=\"_blank\">https://venturebeat.com/2017/06/14/ai-killed-800000-jobs-in-the-u-k-but-created-3-5-million-new-ones/</a></li><li>June Javelosa and Kristin Houser, ”This company replaced 90% of its workforce with machines. Here's what happened”. World Economic Forum. <a href=\"https://www.weforum.org/agenda/2017/02/after-replacing-90-of-employees-with-robots-this-companys-productivity-soared/\" target=\"_blank\">https://www.weforum.org/agenda/2017/02/after-replacing-90-of-employees-with-robots-this-companys-productivity-soared/</a></li><li>Joseph Bien-Kahn, “Trump Can’t Deliver the Rust Belt Jobs He Promised Because Work Has Changed”. Wired. <a href=\"https://www.wired.com/2016/12/trump-cant-deliver-rust-belt-jobs-work-changed/\" target=\"_blank\">https://www.wired.com/2016/12/trump-cant-deliver-rust-belt-jobs-work-changed/</a></li><li>Michael Chui, James Manyika, and Mehdi Miremadi, ”Four fundamentals of workplace automation”. McKinsey Quarterly. <a href=\"http://www.mckinsey.com/business-functions/digital-mckinsey/our-insights/four-fundamentals-of-workplace-automation\" target=\"_blank\">http://www.mckinsey.com/business-functions/digital-mckinsey/our-insights/four-fundamentals-of-workplace-automation</a></li><li>Anders Sandberg &amp; Nick Bostrom, ”Whole Brain Emulation: A Roadmap - Technical Report”. Future of Humanity Institute, Oxford University. <a href=\"http://www.fhi.ox.ac.uk/brain-emulation-roadmap-report.pdf\" target=\"_blank\">http://www.fhi.ox.ac.uk/brain-emulation-roadmap-report.pdf</a></li><li>Adi Gaskell, “Automation And The Future Of Work”. Forbes. <a href=\"http://www.forbes.com/sites/adigaskell/2016/12/22/automation-and-the-future-of-work/#2cfe1dfd3117\" target=\"_blank\">http://www.forbes.com/sites/adigaskell/2016/12/22/automation-and-the-future-of-work/#2cfe1dfd3117</a></li><li>Jane Gilmore, “Fourth industrial revolution. Could automation make life worse for women?”. The Guardian. <a href=\"https://www.theguardian.com/sustainable-business/2016/dec/08/could-automation-make-life-worse-for-women\" target=\"_blank\">https://www.theguardian.com/sustainable-business/2016/dec/08/could-automation-make-life-worse-for-women</a></li><li>Melissa S. Kearney, Brad Hershbein, and David Boddy, ”The Future of Work in the Age of the Machine\". The Hamilton Project. <a href=\"http://www.hamiltonproject.org/assets/legacy/files/downloads_and_links/Work_in_Machine_Age_February_2015_FINAL.pdf\" target=\"_blank\">http://www.hamiltonproject.org/assets/legacy/files/downloads_and_links/Work_in_Machine_Age_February_2015_FINAL.pdf</a></li><li>Erik Sherman, “Automation Won't Create New Jobs Like Technology Did In The Past”. Forbes. <a href=\"http://www.forbes.com/sites/eriksherman/2016/12/17/automation-has-created-more-jobs-in-the-past-but-will-it-now/#261e0a1f27fd\" target=\"_blank\">http://www.forbes.com/sites/eriksherman/2016/12/17/automation-has-created-more-jobs-in-the-past-but-will-it-now/#261e0a1f27fd</a></li><li>David Sparkes, “Mining, manufacturing and fruit picking: can automation save Mackay jobs?”. The Guardian. <a href=\"https://www.theguardian.com/sustainable-business/2016/nov/28/mining-manufacturing-and-fruit-picking-can-automation-save-mackay-jobs\" target=\"_blank\">https://www.theguardian.com/sustainable-business/2016/nov/28/mining-manufacturing-and-fruit-picking-can-automation-save-mackay-jobs</a></li><li>\"What will future jobs look like?\". TED. <a href=\"https://youtu.be/cXQrbxD9_Ng?t=1m35s\" target=\"_blank\">https://youtu.be/cXQrbxD9_Ng?t=1m35s</a></li><li>Frey, C. B., &amp; Osborne, M. A. (2017). The future of employment: how susceptible are jobs to computerisation?. Technological Forecasting and Social Change, 114, 254-280.</li></ul>",
//             "media": {
//                 "video": "https://www.youtube.com/embed/PmfvSfgOGew?start=150",
//                 "image": "",
//                 "text": "Will Robots Take Our Jobs?, Jonathan Strickland, FW: Thinking"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "805f8834-134d-485a-a7ed-13d735be132d"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "81.0000000000000000",
//             "median": 81,
//             "values": [
//                 81
//             ]
//         },
//         "rating_y": {
//             "avg": "70.0000000000000000",
//             "median": 70,
//             "values": [
//                 70
//             ]
//         },
//         "ratingCurrentX": 81,
//         "ratingCurrentY": 70
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "b4dbdf0e-308a-490d-b480-dc3e15cbb1a2",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2019-02-05T11:27:36.000Z",
//         "created_at": "2019-02-05T11:27:36.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Internet of Hacked Things",
//             "short_title": "Internet of Hacked Things",
//             "summary": "According to experts, every device that is connected to Internet should be considered as a hacked one to start with.&nbsp;This means that the IoT expanding to our homes in the form of WiFi connected security cameras, alarm systems, audio-visual devices, or, for example, refrigerators causes an ever increasing threat.",
//             "body": "<h2>Background</h2><p>In 2016 a massive cyberattack was carried out by code that was stored in compromised connected devices such as security cameras. Another concrete example of hacking home devices is a test performed by reporter Andrew McGill from The Atlantic magazine who built a fake toaster which looked a like server for the experiment. It took only an hour from the appearance of the toaster on the Internet before it was compromised.</p><p>One Problem is the limited IPv4 address space that cyber criminals running botnets can scan in a matter of hours. In other words, any connected device can be found, if it is visible. We have also learned from WikiLeaks that governments may use Internet connected audiovisual devices to listen or view our daily lives.</p><h2>Impacts</h2><p>Michiel Jonker, a cyber security advisory from Grant Thornton, has stated that we should stop talking about best practices in cyber security, and stop giving any false hope over sturdy firewalls in the future. The competition on the security of internet and IoT devices is already over. Every device that is connected to internet should be considered as a hacked one to start with. A good cyber security capability should be assessed on how fast your organisation is able to detect and eliminate the hacker in your system.</p><h3>Additional Information</h3><ul><li>Nicholas Fearn, ”The internet of things can be hacked – and the risks are growing every day”. TechRadar. <a href=\"http://www.techradar.com/news/the-internet-of-things-can-be-hacked-and-that-puts-your-life-at-risk\" target=\"_blank\">http://www.techradar.com/news/the-internet-of-things-can-be-hacked-and-that-puts-your-life-at-risk</a></li><li>Simone Margaritelli, ”The easy way your “smart” coffee machine could get hacked and ruin your life”. Quartz. <a href=\"https://qz.com/901823/the-easy-way-your-smart-coffee-machine-could-get-hacked-and-ruin-your-life/\" target=\"_blank\">https://qz.com/901823/the-easy-way-your-smart-coffee-machine-could-get-hacked-and-ruin-your-life/</a></li><li>Jennifer Schlesinger &amp; Andrea Day, ”Suddenly hot smart home devices are ripe for hacking, experts warn”. CNBC. <a href=\"http://www.cnbc.com/2016/12/25/suddenly-hot-smart-home-devices-are-ripe-for-hacking-experts-warn.html\" target=\"_blank\">http://www.cnbc.com/2016/12/25/suddenly-hot-smart-home-devices-are-ripe-for-hacking-experts-warn.html</a></li><li>Andrew McGill, ”The Inevitability of Being Hacked”. The Atlantic. <a href=\"https://www.theatlantic.com/technology/archive/2016/10/we-built-a-fake-web-toaster-and-it-was-hacked-in-an-hour/505571/&lt;\" target=\"_blank\">https://www.theatlantic.com/technology/archive/2016/10/we-built-a-fake-web-toaster-and-it-was-hacked-in-an-hour/505571/&lt;</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/kquTJBKUdTQ",
//                 "image": "",
//                 "text": "Are Smart Homes At Risk From Hackers? - Inside The Dark Web – BBC, BBC Worldwide"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "81b4b36c-a647-468d-af6f-2d817670da89"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "74.0000000000000000",
//             "median": 74,
//             "values": [
//                 74
//             ]
//         },
//         "rating_y": {
//             "avg": "70.0000000000000000",
//             "median": 70,
//             "values": [
//                 70
//             ]
//         },
//         "ratingCurrentX": 74,
//         "ratingCurrentY": 70
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "cfe61f7d-f721-4d69-bf55-4f7320016298",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-10-23T08:31:20.000Z",
//         "created_at": "2018-10-23T08:31:20.000Z",
//         "content": {
//             "type": "bf127402-abbe-42e7-b3c5-a8e46c76cfb0",
//             "title": "Collapsing Housing Markets",
//             "short_title": "Collapsing Housing Markets",
//             "summary": "For the global middle classes, the rapidly growing housing markets have offered relatively safe investment opportunities. However, the value of real estate investments may collapse rather suddenly if global trust in the growth of the housing markets is disturbed.",
//             "body": "<h2>Background</h2><p>The global growth of real estate markets is driven by three strong megatrends. Firstly, urbanisation is intensifying: estimates state that up to 75 % of the global population will live in urban areas by the year 2050. The number of megacities (with more than 10 million inhabitants) is expected to be 37 in 2025. Secondly, world population continues to grow and will reach its peak of ca. 9.3 billion around the year 2050. Thirdly, the amount of capital available for investment is continuously growing and concentrating to fewer and fewer hands. Furthermore, in the increasingly uncertain world, safe investment targets that yield adequate returns are few and far between.</p><p>In fact, the rapidly growing housing markets are still considered one of the most secure investments – especially amongst the middle classes. In China, this development has led to the construction of ghost cities and a serious threat of a real estate bubble. Warnings about similar overheated markets and speculation problems have been raised all around the world.</p><h3>Additional Information</h3><ul><li>“Property markets”. European Territorial Futures, ESPON 2020. <a href=\"http://projects.mcrit.com/esponfutures/index.php/kk\" target=\"_blank\">http://projects.mcrit.com/esponfutures/index.php/kk</a></li><li>”Property market trends”. European Territorial Futures, ESPON 2020. <a href=\"http://projects.mcrit.com/esponfutures/index.php/kk/65-property-markets-trends\" target=\"_blank\">http://projects.mcrit.com/esponfutures/index.php/kk/65-property-markets-trends</a></li><li>”2017 US real estate crash is already underway”. World Finance. <a href=\"https://youtu.be/2VBHzG0dW2Q\" target=\"_blank\">https://youtu.be/2VBHzG0dW2Q</a></li><li>Daniel Peters, ”Meet the 'Vanlifers': a generation of young Australians who have been priced out of the spiralling property market and live and work out of VANS rather than pay landlords because 'rent is slavery’”. Daily Mail Australia. <a href=\"http://www.dailymail.co.uk/news/article-4512858/Australian-Millennials-live-vans-instead-renting.html\" target=\"_blank\">http://www.dailymail.co.uk/news/article-4512858/Australian-Millennials-live-vans-instead-renting.html</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/9lP3f0qPNwo?start=4",
//                 "image": "",
//                 "text": "China's real estate bubble"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "8e5aaed9-d725-48a5-a9b5-8956f542bf63"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "wildcard",
//         "content-type-title": "Wild card",
//         "color": "none",
//         "rating_x": {
//             "avg": "85.0000000000000000",
//             "median": 85,
//             "values": [
//                 85
//             ]
//         },
//         "rating_y": {
//             "avg": "69.0000000000000000",
//             "median": 69,
//             "values": [
//                 69
//             ]
//         },
//         "ratingCurrentY": 69,
//         "ratingCurrentX": 85
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "4678aaf5-fafb-4b18-9f64-2eea9453d604",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1924,
//         "updated_at": "2020-04-24T07:53:28.826Z",
//         "created_at": "2019-03-19T06:52:05.000Z",
//         "content": {
//             "type": "bf127402-abbe-42e7-b3c5-a8e46c76cfb0",
//             "title": "Passenger Cabins on Robot Platforms",
//             "short_title": "Passenger Cabins",
//             "summary": "<p>The passenger cabin, in which a traveller is transported through several stations, and the robot platforms or drones carrying it, may become separate units. This can lead to the creation of an economy built around supporting passengers' comfort, and to the emerging of a new logistical ecosystem based on transporting the cabins.</p>",
//             "body": "<h2>Background</h2><p>This far, several tested robot cars have been automatised versions of existing models. In the future, the robot vehicles will likely not be confined to the present body styles and features.</p><p>One noteworthy direction toward which the passenger traffic is developing is the flying taxi concept, introduced by Audi, Airbus and Italdesign at 2018 Geneva Motor Show. In this design, robot platforms, which carry passenger cabins, operate on highways. Also if need be, a robot drone can transport a cabin from one platform to another. The cabin can also travel on a railway carriage, ship, in a vacuum tube, or on an aerial vehicle. Sturdier and more robust platforms will likely be developed for the truck traffic, and cabins holding multiple passengers might be introduced for mass transit. Either there will be a couple of different operating models, or then there will be platforms with adjustable size and ride height.</p><h2>Impacts</h2><p>Travelling is becoming more and more a part of an active life. At their initial stage, the cabins might be standard models, but in the long run, probably dozens of different applications will be developed for them, and their features and appearances will vary greatly. The cabin can be used as a bedroom, movie theatre, kitchen, gym, cafe, bar, sauna, game room, workspace or a conference room. Customers can buy and customise their cabins any way they please or rent special-purpose cabins. The material the cabin is made of could either be glass, wood, metal, plastic, ceramic, or stone, and the cabin could resemble an old-fashioned car, sports car, space ship, container or almost anything else.</p><p>An economy worth of billions, comparable to the present automobile industry, will likely form around the cabins, and it will blur the boundaries between home, vehicle, vacation home, entertainment centre, workplace, and hotel. It is even possible that the cabins will become homes or offices for many people.</p><p>Also, new kinds of services, which are aimed at the time spent travelling in the cabin, such as virtual games, teaching, restaurant or wellness services or even brothels, could emerge.</p><p>The use of the cabins could also develop in such a way that the cabins meant for housing and short distance travel are a mix of various kinds of modules, whereas the long-distance travel cabins are airtight and durable pods, which have been constructed according to precise safety regulations.</p><h3>Additional Information</h3><ul><li>”Audi, Italdesign and Airbus combine self-driving car and passenger drone”. Audi MediaCenter. <a href=\"https://www.audi-mediacenter.com/en/press-releases/audi-italdesign-and-airbus-combine-self-driving-car-and-passenger-drone-9900\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.audi-mediacenter.com/en/press-releases/audi-italdesign-and-airbus-combine-self-driving-car-and-passenger-drone-9900</a></li><li>Fred Lambert, ”Audi is starting to test its ‘all-electric flying and self-driving car’”. Electric. <a href=\"https://electrek.co/2018/11/27/audi-all-electric-flying-self-driving-car-test/?fbclid=IwAR2W-aWOE1HH9-75_JAetE0CvbMmNkjWfTykmrTmZcdFpcgEvf6PkdE3PO4\" rel=\"noopener noreferrer\" target=\"_blank\">https://electrek.co/2018/11/27/audi-all-electric-flying-self-driving-car-test/?fbclid=IwAR2W-aWOE1HH9-75_JAetE0CvbMmNkjWfTykmrTmZcdFpcgEvf6PkdE3PO4</a></li><li>Olivia Rudgard, “Self-driving cars could function as moving brothels, academics predict”. The Telegraph. <a href=\"https://www.telegraph.co.uk/technology/2018/11/07/brothels-could-move-self-driving-cars-academics-predict/\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.telegraph.co.uk/technology/2018/11/07/brothels-could-move-self-driving-cars-academics-predict/</a></li><li>Cohen, S. A., &amp; Hopkins, D. (2019). Autonomous vehicles and the future of urban tourism. Annals of Tourism Research, 74, 33-42. <a href=\"https://www.academia.edu/37663136/Autonomous_vehicles_and_the_future_of_urban_tourism?fbclid=IwAR02mQEhC0B1jqulOdasnpEGa3s8YNdWH3CmbSyigvwXn-XL3vaBHgvFZEs\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.academia.edu/37663136/Autonomous_vehicles_and_the_future_of_urban_tourism?fbclid=IwAR02mQEhC0B1jqulOdasnpEGa3s8YNdWH3CmbSyigvwXn-XL3vaBHgvFZEs</a></li></ul>",
//             "media": {
//                 "video": "https://www.youtube.com/embed/IXR_b6rK44k",
//                 "image": "",
//                 "text": "Audi, Airbus Concept Flying Taxi / Passenger Drone, Drone Below"
//             },
//             "time_range": {
//                 "min": 2028,
//                 "max": 2040
//             },
//             "related_phenomena": [
//                 "39ae4ecd-56bb-496d-9d95-a2538f84b90f",
//                 "82b1845e-b869-414d-8449-af718dc9f560",
//                 "fc815d84-f3a5-4d83-8f67-1c87467cbe19",
//                 "30da7f9a-4888-4b29-8e9c-e0a27bffe0b8",
//                 "8895a693-f354-4a39-a225-0e4221b6d999",
//                 "91055d26-88de-4878-9018-8d43d2b43880",
//                 "e2a69524-24a5-4098-baaa-f4b889014d2b",
//                 "84483045-08d4-48b9-a12f-36384a6b02f0",
//                 "ee3bada4-c9b4-49b6-9c5c-4c3d46fdb3d1"
//             ],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "5cc6e089-c203-49a0-8303-f19166013018"
//             ],
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "wildcard",
//         "content-type-title": "Wild card",
//         "color": "none",
//         "rating_x": {
//             "avg": "74.0000000000000000",
//             "median": 74,
//             "values": [
//                 74
//             ]
//         },
//         "rating_y": {
//             "avg": "69.0000000000000000",
//             "median": 69,
//             "values": [
//                 69
//             ]
//         },
//         "ratingCurrentX": 74,
//         "ratingCurrentY": 69
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "c87e7bd4-6a3a-4a1f-a6a0-aba71599aab9",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2019-01-25T13:53:48.000Z",
//         "created_at": "2019-01-25T13:53:48.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Flying Goods and People in Cities",
//             "short_title": "Flying Goods +People",
//             "summary": "Amazon, DHL and almost every large delivery company is researching its own system for transporting goods over air. Using mostly quad or multi copters, it is believed that close range transportation of goods will occupy the lower airspace. First human transport quadcopter protoype has been introduced.\n",
//             "body": "<h2>Background</h2><p>A Chinese company called Ehang has introduced a prototype quadcopter that can transport a person. \"184\" Personal Flying Vehicle (PFV) will cost around 200 000 – 300 000 USD. Unavailable previously to civilian traffic, larger quadcopters and drones have been primarily used by the military.</p><p>What will delay commercial deployment of drone delivery systems quite far in time is the lack of regulation of the lower air space. Before local governments can provide automated traffic systems, risks for companies running flying objects above our heads are too significant.</p><p>Currently, companies are looking into using drones first to deliver outside of cities. UPS is going to use quadcopters to deliver emergency supplies to remote areas. Rwanda has begun delivering blood to patients using drones.</p><h2>Impacts</h2><p>Technology and logistics companies will develop drones and UAVs intensively over the coming years. Someone, or companies in collaboration, will have to come up with a traffic system for the lower air space. Likewise, countries that are in the forefront with a legislation that opens up the airspace for commercial and private use are also likely to prosper in the business of flying goods and people in cities.</p><h3>Additional Information</h3><ul><li>Bruno Jacobsén, ”5 Industries Drones Will Revolutionize: See Where Drones Are Bringing Big Changes”. Futures Platform. <a href=\"https://www.futuresplatform.com/blog/5-industries-drones-will-revolutionize\" target=\"_blank\">https://www.futuresplatform.com/blog/5-industries-drones-will-revolutionize</a></li><li>”Ambulance drone: Texas company argodesign unveils done that can be used as an ambulance”. TomoNews. <a href=\"https://youtu.be/bxXjlxR7fhE\" target=\"_blank\">https://youtu.be/bxXjlxR7fhE</a></li><li>Eric Adams, “DHL’s Tilt-Rotor ‘Parcelcopter’ Is Both Awesome and Actually Useful”. Wired. <a href=\"https://www.wired.com/2016/05/dhls-new-drone-can-ship-packages-around-alps/\" target=\"_blank\">https://www.wired.com/2016/05/dhls-new-drone-can-ship-packages-around-alps/</a></li><li>Jamie Condliffe, ”Delivery Option: Drone. Arrival Estimate: 2020”. MIT Technology Review. <a href=\"https://www.technologyreview.com/s/602527/delivery-option-drone-arrival-estimate-2020/\" target=\"_blank\">https://www.technologyreview.com/s/602527/delivery-option-drone-arrival-estimate-2020/</a></li><li>“EHANG184, world's first Autonomous Aerial Vehicle”. Ehang. <a href=\"https://youtu.be/IrPejpbz8RI\" target=\"_blank\">https://youtu.be/IrPejpbz8RI</a></li><li>Mike Elgan, ”Why the future of package delivery is better than drones”. Computerworld. <a href=\"http://www.computerworld.com/article/3126349/robotics/why-the-future-of-package-delivery-is-better-than-drones.html\" target=\"_blank\">http://www.computerworld.com/article/3126349/robotics/why-the-future-of-package-delivery-is-better-than-drones.html</a></li><li>David Goldman, ”Human-carrying drone debuts at CES”. CNN Money. <a href=\"http://money.cnn.com/2016/01/06/technology/ces-2016-ehang-drone/\" target=\"_blank\">http://money.cnn.com/2016/01/06/technology/ces-2016-ehang-drone/</a></li><li>Jasmine Henriques, ”Unmanned Aerial Vehicles (UAV): Drones for Military and Civilian Use”. Global Research. <a href=\"http://www.globalresearch.ca/unmanned-aerial-vehicles-uav-drones-for-military-and-civilian-use/5374666\" target=\"_blank\">http://www.globalresearch.ca/unmanned-aerial-vehicles-uav-drones-for-military-and-civilian-use/5374666</a></li><li>“Package-Delivery Drones Likely Years Away From Federal Approval”. The Wall Street Journal. <a href=\"http://www.wsj.com/articles/package-delivery-drones-likely-years-away-from-federal-approval-1475154227\" target=\"_blank\">http://www.wsj.com/articles/package-delivery-drones-likely-years-away-from-federal-approval-1475154227</a></li><li>Quora, “What Makes The Quadcopter Design So Great For Small Drones?” Forbes. <a href=\"http://www.forbes.com/sites/quora/2013/12/23/what-makes-the-quadcopter-design-so-great-for-small-drones/#142d9b2c202a\" target=\"_blank\">http://www.forbes.com/sites/quora/2013/12/23/what-makes-the-quadcopter-design-so-great-for-small-drones/#142d9b2c202a</a></li><li>Michael Rundle, ”Amazon shows the world its latest Prime Air drones”. Wired. <a href=\"http://www.wired.co.uk/article/amazon-prime-air-latest\" target=\"_blank\">http://www.wired.co.uk/article/amazon-prime-air-latest</a></li><li>James Titcomb, “Uber plans self-flying drone taxis to beat city traffic”. The Telegraph. <a href=\"http://www.telegraph.co.uk/technology/2016/09/26/uber-plans-self-flying-drone-taxis-to-beat-city-traffic/\" target=\"_blank\">http://www.telegraph.co.uk/technology/2016/09/26/uber-plans-self-flying-drone-taxis-to-beat-city-traffic/</a></li><li>Amar Tor, “Drones begin delivering blood in Rwanda”. The Verge. <a href=\"http://www.theverge.com/2016/10/13/13267868/zipline-drone-delivery-rwanda-blood-launch\" target=\"_blank\">http://www.theverge.com/2016/10/13/13267868/zipline-drone-delivery-rwanda-blood-launch</a></li><li>James Trew, “This supersized drone will fly you to work (or anywhere)”. Endgadget. <a href=\"https://www.engadget.com/2016/01/06/184-delivery-drone-for-people/\" target=\"_blank\">https://www.engadget.com/2016/01/06/184-delivery-drone-for-people/</a></li><li>Jonathan Vanian, “Here's What UPS Finds Interesting About Drones”. Fortune. <a href=\"http://fortune.com/2016/10/03/ups-drones-delivery-testing/\" target=\"_blank\">http://fortune.com/2016/10/03/ups-drones-delivery-testing/</a></li><li>Joe Watts, ”Are drone laws going to change after the Gatwick incident?”. Independent. <a href=\"https://www.independent.co.uk/news/uk/politics/drone-laws-gatwick-delays-grayling-a8694591.html?fbclid=IwAR3AGA_cKUo36-T2oh7i1n-1zFIsL5JgHOs0H5r0Hez5cQNwrtO4lyEGpWM\" target=\"_blank\">https://www.independent.co.uk/news/uk/politics/drone-laws-gatwick-delays-grayling-a8694591.html?fbclid=IwAR3AGA_cKUo36-T2oh7i1n-1zFIsL5JgHOs0H5r0Hez5cQNwrtO4lyEGpWM</a></li></ul>",
//             "media": {
//                 "video": "https://www.youtube.com/embed/luc7KkCFKWY",
//                 "image": "",
//                 "text": "“Making deliveries with the DHL Parcelcopter 3.0”. DHL."
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "9ada4643-26ca-48bd-8254-5a323d7805aa"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "74.0000000000000000",
//             "median": 74,
//             "values": [
//                 74
//             ]
//         },
//         "rating_y": {
//             "avg": "69.0000000000000000",
//             "median": 69,
//             "values": [
//                 69
//             ]
//         },
//         "ratingCurrentX": 74,
//         "ratingCurrentY": 69
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "2c039058-8cb4-470f-a3e4-cc3ccb6fee40",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-09-10T07:02:03.000Z",
//         "created_at": "2018-09-10T07:02:03.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Multichannel Shopping",
//             "short_title": "Multichannel Shopping",
//             "summary": "Customers want to consider and complete their purchases in a place and time that best suits them. The pressures from new kinds of demands cause immense changes and challenges to actors who have concentrated on traditional sales and service channels.\n",
//             "body": "<h2>Background</h2><p>The Internet, social media, and mobile technologies have essentially changed they consumption behaviour of many people. Price comparison and user reviews or product information are always just a few clicks away. Online shopping has grown for a long time and products are increasingly often ordered from abroad instead of the domestic market. Many customers also wish to check and book their services online.</p><p>Consumers have gained immense new possibilities and competition over potential customers is becoming more difficult for traditional shopkeepers and chains, who cannot compete with the prices of online actors. Friendly and expert service are often no longer enough to convince customers to make a purchase decision at the store; they might opt for ordering the same product cheaper online.</p><h2>Impacts</h2><p>Customer loyalty is becoming rare as consumers demand personalised and seamless experiences through all channels. Regardless of the field or industry, the readiness to offer comprehensive and customer-centred experiences is gaining importance as the boundaries between physical and digital services blur.</p><h3>Additional Information</h3><ul><li>Benedikt Schmaus,&nbsp;Birger Maekelburger &amp; Dominik Felsmann, \"The 2017 Global Omnichannel Retail Index: Omnichannel on the march\". PWC. <a href=\"https://www.strategyand.pwc.com/reports/2017-global-omnichannel-retail-index\" target=\"_blank\">https://www.strategyand.pwc.com/reports/2017-global-omnichannel-retail-index</a></li><li>Humayun Khan, \"Consumers Are Showrooming and Webrooming Your Business, Here's What That Means and What You Can Do About It\". Shopify. <a href=\"https://www.shopify.com/retail/119920451-consumers-are-showrooming-and-webrooming-your-business-heres-what-that-means-and-what-you-can-do-about-it\" target=\"_blank\">https://www.shopify.com/retail/119920451-consumers-are-showrooming-and-webrooming-your-business-heres-what-that-means-and-what-you-can-do-about-it</a></li><li>\"Customer-centricity: Where the Future is Created\". KPMG US. <a href=\"https://youtu.be/i4gFAf7yAn0\" target=\"_blank\">https://youtu.be/i4gFAf7yAn0</a></li><li>\"IBM Omni-channel Order Management\". IBM Watson Commerce. <a href=\"https://youtu.be/ojfNgP0eyLc\" target=\"_blank\">https://youtu.be/ojfNgP0eyLc</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/vL2ujjLKx2s",
//                 "image": "",
//                 "text": "Why Multichannel Matters, Tesco"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "4c2fb941-3acf-4761-b496-b59184206623"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "67.0000000000000000",
//             "median": 67,
//             "values": [
//                 67
//             ]
//         },
//         "rating_y": {
//             "avg": "65.0000000000000000",
//             "median": 65,
//             "values": [
//                 65
//             ]
//         },
//         "ratingCurrentX": 67,
//         "ratingCurrentY": 65
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "d73ad96d-d68f-43f3-84e2-4d667da282ba",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2019-02-11T09:27:14.000Z",
//         "created_at": "2019-02-11T09:27:14.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "5G Wireless Network",
//             "short_title": "5G Network",
//             "summary": "The 5th next-generation of mobile networks will bring us the ultra-fast Internet connections of the future. 5G is expected to allow for new technologies to really take off, such as IoT, VR, and autonomous vehicles, due to its low latency and massive capacity. According to some analysts, the 5G technology could already be available by 2019 or 2020, with more than 1 billion people being connected to it by 2023.\n",
//             "body": "<h2>Background</h2><p>1G brought us cellular communication, 2G brought us text messages and other services, 3G brought us internet connection, and the latest 4G brought us the ability to seamlessly stream video online and exchange other types of media, like when you watch a video on your Facebook feed. Although experts only predict 5G to become widely available in a couple of years, it is guaranteed to give us faster speeds and to become the driving technology behind the Internet of Things.</p><p>But even if it’s not clear how it will come about (one option is by tapping into millimetre waves), there are a few requirements that it should meet. These include: very low latency compared to LTE, the ability to have hundreds of thousands of connections for wireless sensors, improved coverage, and of course, extremely fast speeds, even when in very crowded areas like football stadiums or major events.</p><p>Currently, there aren’t really any well-defined standards for 5G and as a result, different companies and countries are taking different approaches. Furthermore, over 180 scientists and doctors from around the world have warned of the potential health impacts resulting from increased exposure to wireless radiation. In September 2017, they sent a declaration to EU officials demanding moratorium on 5G until its potential hazards for human health, such as cancer, infertility, and neurological problems as well as the environment impact are fully investigated.</p><h2>Impacts&nbsp;</h2><p>Despite 5G technology probably still taking some time to fully roll out, it will certainly have a major impact on our lives. It will also generate a range of new business opportunities, from better automation in certain industries to platforms around connected devices.</p><p>By 2023, more than 1 billion people might be connected to it, with more than half coming from China, a nation betting heavily on technology development. Other countries in the race towards 5G adoption include South Korea, Japan, and the United States.</p><h3>Additional Information</h3><ul><li>”Everything You Need to Know About 5G”. IEEE Spectrum. <a href=\"https://spectrum.ieee.org/video/telecom/wireless/everything-you-need-to-know-about-5g\" target=\"_blank\">https://spectrum.ieee.org/video/telecom/wireless/everything-you-need-to-know-about-5g</a></li><li>Maxwell Cooter, ”Qualcomm claims it has just achieved a major milestone in 5G connectivity”. TechRadar. <a href=\"http://www.techradar.com/news/qualcomm-claims-it-has-just-achieved-a-major-milestone-in-5g-connectivity\" target=\"_blank\">http://www.techradar.com/news/qualcomm-claims-it-has-just-achieved-a-major-milestone-in-5g-connectivity</a></li><li>”’First 5G mobile net connection' claimed by Qualcomm”. BBC News. <a href=\"http://www.bbc.com/news/technology-41652967\" target=\"_blank\">http://www.bbc.com/news/technology-41652967</a></li><li>Stephen Shankland, ”Get ready for 'unlimited data' of 5G networks in 2019”. CNET. <a href=\"https://www.cnet.com/news/5g-phone-networks-could-ease-data-limit-worries/\" target=\"_blank\">https://www.cnet.com/news/5g-phone-networks-could-ease-data-limit-worries/</a></li><li>David Reid, ”1 billion could be using 5G by 2023 with China set to dominate”. CNBC.<a href=\"https://www.cnbc.com/2017/10/18/5g-to-have-1-billion-users-by-2023-with-china-set-to-dominate.html\" target=\"_blank\">https://www.cnbc.com/2017/10/18/5g-to-have-1-billion-users-by-2023-with-china-set-to-dominate.html</a></li><li>Jennifer Wills, ”5G Technology: Which Country Will Be the First to Adapt?”. Investopedia. <a href=\"https://www.investopedia.com/articles/markets-economy/090916/5g-technology-which-country-will-be-first-adapt.asp\" target=\"_blank\">https://www.investopedia.com/articles/markets-economy/090916/5g-technology-which-country-will-be-first-adapt.asp</a></li><li>Joel Moskowitz, ”Scientists and Doctors Demand Moratorium on 5G”. Electromagnetic Radiation Safety. <a href=\"http://www.saferemr.com/2017/09/5G-moratorium12.html\" target=\"_blank\">http://www.saferemr.com/2017/09/5G-moratorium12.html</a></li><li>Elena Malykhina, ”Who Cares about 5G Wireless? You Will”. Scientific American. <a href=\"https://www.scientificamerican.com/article/who-cares-about-5g-wireless-you-will/\" target=\"_blank\">https://www.scientificamerican.com/article/who-cares-about-5g-wireless-you-will/</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/GEx_d0SjvS0",
//                 "image": "",
//                 "text": "Everything You Need to Know About 5G, IEEE Spectrum"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "90d6d622-31b9-499a-b0be-13c30c87d2f4"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "66.0000000000000000",
//             "median": 66,
//             "values": [
//                 66
//             ]
//         },
//         "rating_y": {
//             "avg": "64.0000000000000000",
//             "median": 64,
//             "values": [
//                 64
//             ]
//         },
//         "ratingCurrentY": 64,
//         "ratingCurrentX": 66
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "fc815d84-f3a5-4d83-8f67-1c87467cbe19",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1924,
//         "updated_at": "2020-04-24T08:11:43.891Z",
//         "created_at": "2019-03-19T06:49:16.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Road Traffic as Software",
//             "short_title": "Road Traffic as Software",
//             "summary": "<p>Traffic systems in the future will be object oriented complex software systems that control robot cars as well as manually operated vehicles. Traffic itself will become software and a marketplace, where companies and individuals can purchase different speed limits and time slots.</p>",
//             "body": "<h2>Background</h2><p>Companies like Google and Tesla compete to build autonomous vehicles that can navigate roads without driver input. This is no doubt a necessary step in the development towards traffic that is driverless.</p><p>It is highly likely that autonomous cars made by a myriad of companies could not be the basis of future traffic, or at least not without synchronisation of their decision-making algorithms. Imagine for example a conflict of interest situation between two autonomous cars about to collide. If they both make the same choice, yet cannot communicate with each other, they will either crash or stall.</p><p>Design theorist Anthony Dunne sees software based traffic system as a new kind of economy: <em>“It will be a bit like economy airlines. Once there is a technology that can control access to the roads as a limited resource, it will be used to maximize revenue in an extreme way with still some humaneness.”</em></p><p>Dunne foresees governments leasing road use rights to companies like Google or Amazon, who in turn divide the asset amongst consumers and companies. Depending on how much one pays, it gives more access (quantity of vehicles, seats or tonnes) or speed, where part of the traffic is slowed down while some sped up.</p><p>Traffic as software will enable reduction of traffic jams as companies and their employees can begin to manage arrival times to work and minimize time spent in traffic.</p><p>Toll roads with expensive collection systems are a forerunner of privatization of roads and traffic rights. Whether traffic in the future is based on individual moving vehicles or more collective units such as trains and buses or a hybrid of these as today, remains to be seen.</p><p>Given that cars are not driven by people with their emotional way of driving, software controlled vehicles can function in a software based traffic system seamlessly. Role of Artificial Intelligence, especially deep learning algorithms will be vital to create an adaptive system that learns about needs of both transported humans as well as transported goods.</p><h2>Impacts</h2><p>Without co-coordinated software that provides a traffic system between autonomously moving vehicles, the entire industry could fail. It is likely that companies that now excel in software like Google will focus on software rather than vehicles themselves. Traffic as software will require major investments, legislative efforts and collaboration between companies developing cars and their support systems. Traffic as software can become a major new field of business.</p><h3>Additional Information</h3><ul><li>Brandon Formby, ”New law clears the way for driverless cars on Texas roads”. The Texas Tribune. <a href=\"https://www.texastribune.org/2017/06/15/lawmakers-clear-way-driverless-cars-texas-roads-and-highways/\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.texastribune.org/2017/06/15/lawmakers-clear-way-driverless-cars-texas-roads-and-highways/</a></li><li>“A world of cars that drive themselves”. CBS Sunday Morning. <a href=\"https://youtu.be/qU90XeCKIYI\" rel=\"noopener noreferrer\" target=\"_blank\">https://youtu.be/qU90XeCKIYI</a></li><li>Alex Hern, \"Google spins off self-driving car division, signalling new direction”. The Guardian. <a href=\"https://www.theguardian.com/technology/2016/dec/14/waymo-google-self-driving-car-division\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.theguardian.com/technology/2016/dec/14/waymo-google-self-driving-car-division</a></li><li>Arthur D. Little, ”Future of Urban Mobility 2.0”. Future Lab. <a href=\"http://www.adlittle.com/sites/default/files/viewpoints/Arthur_D._Little___UITP_Future_of_Urban_Mobility_2_0.pdf\" rel=\"noopener noreferrer\" target=\"_blank\">http://www.adlittle.com/sites/default/files/viewpoints/Arthur_D._Little___UITP_Future_of_Urban_Mobility_2_0.pdf</a></li><li>”Sustainable Mobility Project 2.0”. Wbcsd. <a href=\"http://www.wbcsd.org/Projects/Sustainable-Mobility-Project-2.0\" rel=\"noopener noreferrer\" target=\"_blank\">http://www.wbcsd.org/Projects/Sustainable-Mobility-Project-2.0</a></li><li>”The Invisible Chauffeur”. Siemens. <a href=\"http://www.siemens.com/innovation/en/home/pictures-of-the-future/digitalization-and-software/autonomous-systems-selfdriving-vehicles.html\" rel=\"noopener noreferrer\" target=\"_blank\">http://www.siemens.com/innovation/en/home/pictures-of-the-future/digitalization-and-software/autonomous-systems-selfdriving-vehicles.html</a></li><li>James Trew, \"Scientists investigating AI-based traffic control, so we can only blame the jams on ourselves”. Endgadget. <a href=\"https://www.engadget.com/2012/08/26/scientists-investigating-ai-based-traffic-control/\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.engadget.com/2012/08/26/scientists-investigating-ai-based-traffic-control/</a></li><li>”What the roads of the future could look like”. The Telegraph. <a href=\"http://www.telegraph.co.uk/news/uknews/road-and-rail-transport/11268547/What-the-roads-of-the-future-could-look-like.html\" rel=\"noopener noreferrer\" target=\"_blank\">http://www.telegraph.co.uk/news/uknews/road-and-rail-transport/11268547/What-the-roads-of-the-future-could-look-like.html</a></li></ul>",
//             "media": {
//                 "video": "https://youtube.com/embed/QbVHXrCBFBE?start=1736",
//                 "image": "",
//                 "text": "Speculative Everything - Anthony Dunne at Resonate 2013, Deng Wendy"
//             },
//             "time_range": {
//                 "min": 2020,
//                 "max": 2023
//             },
//             "related_phenomena": [
//                 "4678aaf5-fafb-4b18-9f64-2eea9453d604",
//                 "82b1845e-b869-414d-8449-af718dc9f560",
//                 "30da7f9a-4888-4b29-8e9c-e0a27bffe0b8",
//                 "8895a693-f354-4a39-a225-0e4221b6d999",
//                 "91055d26-88de-4878-9018-8d43d2b43880",
//                 "e2a69524-24a5-4098-baaa-f4b889014d2b",
//                 "84483045-08d4-48b9-a12f-36384a6b02f0",
//                 "ee3bada4-c9b4-49b6-9c5c-4c3d46fdb3d1"
//             ],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "8837dcc3-9fde-4a23-8c2d-5c0e34ebe099"
//             ],
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "62.0000000000000000",
//             "median": 62,
//             "values": [
//                 62
//             ]
//         },
//         "rating_y": {
//             "avg": "63.0000000000000000",
//             "median": 63,
//             "values": [
//                 63
//             ]
//         },
//         "ratingCurrentX": 62,
//         "ratingCurrentY": 63
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "bffc3591-6587-48e7-b01c-65941807782c",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2019-02-11T09:36:00.000Z",
//         "created_at": "2019-02-11T09:36:00.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "New Era in Logistics",
//             "short_title": "New Era in Logistics",
//             "summary": "The manufacturing and delivery of products from the manufacturing site to the consumer is changing perhaps more than ever before in history. Along with the logistics itself, the role of the retail as well as the need for intermediate storage, ports, forklifts, trucks, container ships, container cranes and even the need for containers may substantially decrease from what it is at the present.",
//             "body": "<h2>Background</h2><p>The goal of Amazon is to start a whole new era of delivering products from the production site to people's doorsteps. In the company's vision, a large airship of Amazon carries a huge range of product directly from, for instance, a Chinese factory, into the airspace above a city in the USA, where small drones manage the delivery of the goods, as stated in the order, directly to customers’ doorsteps.</p><p>Even if this vision of Amazon as such does not materialize, there is, due to new developments, nevertheless a massive new era beginning in logistics, intermediate storage, retail, and production. Along with airships and small airplanes, 3D printing is also continuously expanding to new areas and is enabling well-tailored on-demand production near the consumers themselves. If 3D local production becomes more common, it will substantially reduce the need for storage and product transport, since the formulas that the equipment require are electronic, and the raw materials needed are mainly powders and liquids.&nbsp;</p><p>The third area that may launch a new era for logistics, even if airplanes and 3D printing were not successful, are supersonic vacuum tubes, of which the best-known are the Hyperloop and the Chinese state-developed flying train Hyperflight. In the planned supersonic vacuum tubes it could be possible to transport containers from a Chinese factory to, for example, a European city within a few hours.</p><h2>Impacts</h2><p>In the vision of Amazon, intermediate storage, middlemen, forklifts, trucks, ports, container ships, container cranes or containers are hardly needed anymore. In this scenario retail would also no longer have the role it currently has, storing and distributing goods. Basically, Amazon airships would be able to take care of all delivery of the goods for an entire city. However, there are still several challenges to this vision, such as creation of a traffic system for the urban airspace, new legislation, planning a safe follow-up for the goods delivered at the doorstep, and especially addressing the sizeable electricity consumption and the need to charge the batteries of the huge flock of drones.</p><h3>Additional Information</h3><ul><li>“Making deliveries with the DHL Parcelcopter 3.0”. DHL. <a href=\"https://youtube.com/embed/luc7KkCFKWY\" target=\"_blank\">https://youtube.com/embed/luc7KkCFKWY</a></li><li>Caroline McGuire, ”China reveals plans for a ‘flying train’ that could reach speeds of 4,000 km/h”. News. <a href=\"http://www.news.com.au/technology/innovation/inventions/china-reveals-plans-for-a-flying-train-that-could-reach-speeds-of-4000kmh/news-story/fbe1c30a6af1460798c75c2950bcc84e\" target=\"_blank\">http://www.news.com.au/technology/innovation/inventions/china-reveals-plans-for-a-flying-train-that-could-reach-speeds-of-4000kmh/news-story/fbe1c30a6af1460798c75c2950bcc84e</a></li><li>Mike Elgan, ”Why the future of package delivery is better than drones”. Computerworld. <a href=\"http://www.computerworld.com/article/3126349/robotics/why-the-future-of-package-delivery-is-better-than-drones.html\" target=\"_blank\">http://www.computerworld.com/article/3126349/robotics/why-the-future-of-package-delivery-is-better-than-drones.html</a></li><li>Amar Tor, “Drones begin delivering blood in Rwanda”. The Verge. <a href=\"http://www.theverge.com/2016/10/13/13267868/zipline-drone-delivery-rwanda-blood-launch\" target=\"_blank\">http://www.theverge.com/2016/10/13/13267868/zipline-drone-delivery-rwanda-blood-launch</a></li><li>Jamie Condliffe, ”Delivery Option: Drone. Arrival Estimate: 2020”. MIT Technology Review. <a href=\"https://www.technologyreview.com/s/602527/delivery-option-drone-arrival-estimate-2020/\" target=\"_blank\">https://www.technologyreview.com/s/602527/delivery-option-drone-arrival-estimate-2020/</a></li><li>James Titcomb, “Uber plans self-flying drone taxis to beat city traffic”. The Telegraph. <a href=\"http://www.telegraph.co.uk/technology/2016/09/26/uber-plans-self-flying-drone-taxis-to-beat-city-traffic/\" target=\"_blank\">http://www.telegraph.co.uk/technology/2016/09/26/uber-plans-self-flying-drone-taxis-to-beat-city-traffic/</a></li><li>Joe Watts, ”Are drone laws going to change after the Gatwick incident?”. Independent. <a href=\"https://www.independent.co.uk/news/uk/politics/drone-laws-gatwick-delays-grayling-a8694591.html?fbclid=IwAR3AGA_cKUo36-T2oh7i1n-1zFIsL5JgHOs0H5r0Hez5cQNwrtO4lyEGpWM\" target=\"_blank\">https://www.independent.co.uk/news/uk/politics/drone-laws-gatwick-delays-grayling-a8694591.html?fbclid=IwAR3AGA_cKUo36-T2oh7i1n-1zFIsL5JgHOs0H5r0Hez5cQNwrtO4lyEGpWM</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/7aYHKq3pwfE",
//                 "image": "",
//                 "text": "Amazon airship: Amazon patents unmanned airship to launch its delivery drones, TomoNews"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "dff2e0b1-20d4-41f1-841e-cdd0c9e9a61b"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "57.0000000000000000",
//             "median": 57,
//             "values": [
//                 57
//             ]
//         },
//         "rating_y": {
//             "avg": "54.0000000000000000",
//             "median": 54,
//             "values": [
//                 54
//             ]
//         },
//         "ratingCurrentX": 57,
//         "ratingCurrentY": 54
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "decd5a11-56f5-4c69-b2d5-cb67b915d9b9",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-10-01T10:21:15.000Z",
//         "created_at": "2018-10-01T10:21:15.000Z",
//         "content": {
//             "type": "bf127402-abbe-42e7-b3c5-a8e46c76cfb0",
//             "title": "Automated Health Spaces",
//             "short_title": "Automated Health Spaces",
//             "summary": "In the future, we may utilise fully automated health spaces that make use of artificial intelligence (AI). These spaces would monitor our bodily functions and analyse gathered data, compare data to our personal genetic map, and automatically diagnose what kind of action we should take.",
//             "body": "<h2>Background</h2><p>At first, spaces designed for monitoring and analysing human health as well as related mobile applications become more common. Next, available services will offer peer review and comparison of health data as well as crowdsourced services, automated diagnostics, and online consultations of international experts. Later, health services will also include augmented and virtual reality applications as well as health and nutrition scanners. All the aforementioned health-promoting services can be actualised through mobile means, regardless of location. Actual automated health spaces become a reality only when all monitoring, data analyses, AI consultation, and real-time data visualisation performed in a single location are combined with diagnosis-based treatment, including e.g. 3D-printing of medicines.</p><h2>Impacts</h2><p>The role of contemporary health clinics will significantly diminish. In the future people will mostly be able to find treatment in their local automated health space or through mobile tools and the availability of care personnel is often unnecessary. Only in more severe cases of disease or trauma are patients required to visit a doctor or a hospital.</p><h3>Additional Information</h3><ul><li>”A Chinese AI passed the national medical licensing exam, so technically it’s a doctor”. ZME Science. <a href=\"https://www.zmescience.com/science/china-ai-doctor-xiaoyi/\" target=\"_blank\">https://www.zmescience.com/science/china-ai-doctor-xiaoyi/</a></li><li>”Health Tracking Tattoos”. Insider. <a href=\"https://youtu.be/N6fOo9V5hH8\" target=\"_blank\">https://youtu.be/N6fOo9V5hH8</a></li><li>Susskind, Richard &amp; Susskind Daniel, \"Technology Will Replace Many Doctors, Lawyers, and Other Professionals\". Harvard Business Review. <a href=\"https://hbr.org/2016/10/robots-will-replace-doctors-lawyers-and-other-professionals\" target=\"_blank\">https://hbr.org/2016/10/robots-will-replace-doctors-lawyers-and-other-professionals</a></li><li>Yvette Brazier, ”mHealth solutions: the future of health care”. Medical News Today. <a href=\"http://www.medicalnewstoday.com/articles/306872.php\" target=\"_blank\">http://www.medicalnewstoday.com/articles/306872.php</a></li><li>”How It Works: IBM Watson Health”. IBM Think Academy. <a href=\"https://www.youtube.com/watch?v=ZPXCF5e1_HI\" target=\"_blank\">https://www.youtube.com/watch?v=ZPXCF5e1_HI</a></li><li>Hossam Haick, ”Sniffphone a Phone So Smart It Sniffs out Disease”. Technion. <a href=\"https://www.youtube.com/watch?v=GPfPSX7Sufs\" target=\"_blank\">https://www.youtube.com/watch?v=GPfPSX7Sufs</a></li></ul>",
//             "media": {
//                 "video": "https://www.youtube.com/embed/MDO_-W6P4JY?start=25",
//                 "image": "",
//                 "text": "What To Expect From Digital Health In 2018?, The Medical Futurist"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "02ac83dd-1318-46c2-a1df-0ea835f313f8"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "wildcard",
//         "content-type-title": "Wild card",
//         "color": "none",
//         "rating_x": {
//             "avg": "73.0000000000000000",
//             "median": 73,
//             "values": [
//                 73
//             ]
//         },
//         "rating_y": {
//             "avg": "50.0000000000000000",
//             "median": 50,
//             "values": [
//                 50
//             ]
//         },
//         "ratingCurrentX": 73,
//         "ratingCurrentY": 50
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "667dddf0-f00c-46cc-ad26-2f21803bcb7f",
//         "type": "phenomenon",
//         "language": "en",
//         "content": {
//             "title": "public content type",
//             "short_title": "public content type",
//             "summary": "<p>public content type type, content.</p>",
//             "body": "<p>public content type</p>",
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "media": {
//                 "video": "",
//                 "image": "",
//                 "text": ""
//             },
//             "related_phenomena": [],
//             "feed_tags": [],
//             "time_range": {
//                 "min": 2023,
//                 "max": 2028
//             },
//             "links": []
//         },
//         "archived": false,
//         "updated_by": 90036,
//         "created_by": 1,
//         "created_at": "2020-06-02T16:31:50.884Z",
//         "updated_at": "2020-09-07T07:51:29.941Z",
//         "tags_fp:docs/props/has": [
//             "fp:tags/theme/communication-journalism-and-social-media",
//             "fp:tags/theme/climate-change"
//         ],
//         "tags": [
//             "fp:tags/theme/communication-journalism-and-social-media",
//             "fp:tags/theme/climate-change"
//         ],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "37.0000000000000000",
//             "median": 37,
//             "values": [
//                 37
//             ]
//         },
//         "rating_y": {
//             "avg": "50.0000000000000000",
//             "median": 50,
//             "values": [
//                 50
//             ]
//         },
//         "ratingCurrentX": 37,
//         "ratingCurrentY": 50
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "6425a4a5-8d1f-4084-bf0c-87c989c154f9",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1,
//         "updated_at": "2020-04-24T07:50:45.300Z",
//         "created_at": "2020-02-10T10:54:50.000Z",
//         "content": {
//             "type": "474ead6c-06c4-46a9-bf9f-258682108888",
//             "title": "test new weak edit",
//             "short_title": "",
//             "summary": "",
//             "body": "",
//             "media": {
//                 "video": "",
//                 "image": "",
//                 "text": ""
//             },
//             "time_range": {
//                 "min": 2028,
//                 "max": 2040
//             },
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [],
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "weaksignal",
//         "content-type-title": "Weak signal",
//         "color": "none",
//         "rating_x": {
//             "avg": "38.0000000000000000",
//             "median": 38,
//             "values": [
//                 38
//             ]
//         },
//         "rating_y": {
//             "avg": "40.0000000000000000",
//             "median": 40,
//             "values": [
//                 40
//             ]
//         },
//         "ratingCurrentX": 38,
//         "ratingCurrentY": 40
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "3edd3e08-9fc9-44b0-b00a-f86320b52d58",
//         "type": "phenomenon",
//         "language": "en",
//         "content": {
//             "title": "Opoint Test ",
//             "short_title": "Opoint",
//             "summary": "<p>Summary</p>",
//             "body": "<p>Main Content</p>",
//             "type": "6528f835-0637-4dfb-8916-474b8053d68d",
//             "media": {
//                 "video": "",
//                 "image": "",
//                 "text": ""
//             },
//             "related_phenomena": [
//                 "64c2f73c-bd6b-4081-aa8c-0d808dcd0969",
//                 "468e99d6-25f1-4066-93fe-82b41d31ef36",
//                 "a96f9455-45ec-4086-95b9-e8e0eb3c8f75"
//             ],
//             "feed_tags": [],
//             "time_range": {
//                 "min": 2020,
//                 "max": 2023
//             },
//             "links": []
//         },
//         "archived": false,
//         "updated_by": 1,
//         "created_by": 1,
//         "created_at": "2020-09-07T07:42:16.937Z",
//         "updated_at": "2020-09-08T07:54:52.791Z",
//         "tags_fp:docs/props/has": [
//             "fp:tags/theme/automation-ai-and-robotisation",
//             "fp:tags/theme/business-and-value-chains",
//             "fp:tags/theme/climate-change",
//             "fp:tags/theme/communication-journalism-and-social-media",
//             "fp:tags/theme/construction-and-urbanisation",
//             "fp:tags/theme/countries-states-and-regions",
//             "fp:tags/theme/digitalisation-digital-services-it-iot-and-smart-devices",
//             "fp:tags/theme/energy-sources-and-production-methods",
//             "fp:tags/theme/finance-money-investment-and-ownership",
//             "fp:tags/theme/food-production-and-consumption",
//             "fp:tags/theme/global-economy",
//             "fp:tags/theme/health-and-wellbeing",
//             "fp:tags/theme/education-learning-and-knowledge-relationship"
//         ],
//         "tags": [
//             "fp:tags/theme/automation-ai-and-robotisation",
//             "fp:tags/theme/business-and-value-chains",
//             "fp:tags/theme/climate-change",
//             "fp:tags/theme/communication-journalism-and-social-media",
//             "fp:tags/theme/construction-and-urbanisation",
//             "fp:tags/theme/countries-states-and-regions",
//             "fp:tags/theme/digitalisation-digital-services-it-iot-and-smart-devices",
//             "fp:tags/theme/energy-sources-and-production-methods",
//             "fp:tags/theme/finance-money-investment-and-ownership",
//             "fp:tags/theme/food-production-and-consumption",
//             "fp:tags/theme/global-economy",
//             "fp:tags/theme/health-and-wellbeing",
//             "fp:tags/theme/education-learning-and-knowledge-relationship"
//         ],
//         "content-type-alias": "summary",
//         "content-type-title": "Summary",
//         "color": "none",
//         "rating_x": {
//             "avg": "37.0000000000000000",
//             "median": 37,
//             "values": [
//                 37
//             ]
//         },
//         "rating_y": {
//             "avg": "36.0000000000000000",
//             "median": 36,
//             "values": [
//                 36
//             ]
//         },
//         "ratingCurrentX": 37,
//         "ratingCurrentY": 36
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "7a7d33e1-fa2e-415e-866a-99733a6536d1",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1924,
//         "updated_at": "2020-04-24T07:53:16.479Z",
//         "created_at": "2019-03-19T07:22:40.000Z",
//         "content": {
//             "type": "474ead6c-06c4-46a9-bf9f-258682108888",
//             "title": "Acoustic Levitation",
//             "short_title": "Acoustic Levitation",
//             "summary": "<p>Acoustic levitation is a method for making objects float by using intense sound waves. At present, it is only possible to levitate small objects so that they are kept in place, however the researchers aim to apply the method also to large, mobile objects in the future. From manufacturing to pharmaceutics, acoustic levitation offers potential applications for a variety of industries.</p>",
//             "body": "<h3>Additional Information</h3><ul><li>Lisa Zyga, ”Researchers demonstrate acoustic levitation of a large sphere\". Phys.Org. <a href=\"https://phys.org/news/2016-08-acoustic-levitation-large-sphere.html\" rel=\"noopener noreferrer\" target=\"_blank\">https://phys.org/news/2016-08-acoustic-levitation-large-sphere.html</a></li><li>Chelsea Gohd, ”Could we levitate humans with the world’s most powerful acoustic tractor beam”. Futurism. <a href=\"https://futurism.com/could-levitate-humans-worlds-most-powerful-acoustic-tractor-beam\" rel=\"noopener noreferrer\" target=\"_blank\">https://futurism.com/could-levitate-humans-worlds-most-powerful-acoustic-tractor-beam</a></li><li>”Acoustic levitation”. Wikipedia. <a href=\"https://en.wikipedia.org/wiki/Acoustic_levitation\" rel=\"noopener noreferrer\" target=\"_blank\">https://en.wikipedia.org/wiki/Acoustic_levitation</a></li></ul>",
//             "media": {
//                 "video": "https://www.youtube.com/embed/gHAe4FFHtB0?start=23",
//                 "image": "",
//                 "text": "Scientists Just Used a Tractor Beam to Levitate the Largest Object Yet, Seeker"
//             },
//             "time_range": {
//                 "min": 2020,
//                 "max": 2023
//             },
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [],
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "weaksignal",
//         "content-type-title": "Weak signal",
//         "color": "none",
//         "rating_x": {
//             "avg": "62.0000000000000000",
//             "median": 62,
//             "values": [
//                 62
//             ]
//         },
//         "rating_y": {
//             "avg": "30.0000000000000000",
//             "median": 30,
//             "values": [
//                 30
//             ]
//         },
//         "ratingCurrentY": 30,
//         "ratingCurrentX": 62
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "efc23fcc-f5f5-4edf-a153-b84cc3abfa49",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2019-02-01T12:16:28.000Z",
//         "created_at": "2019-02-01T12:16:28.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Smart Homes",
//             "short_title": "Smart Homes",
//             "summary": "For now, smart technologies at home have been limited to home appliances, entertainment, and security. However, increasingly comprehensive solutions, where smartness is built into structures and furniture are coming to the market. In addition, new, efficient smart devices are continuously developed to handle and assist in chores and housework.\n",
//             "body": "<h3>Additional Information</h3><ul><li>\"Toyota robot tidying up a room\". I love Robotics. <a href=\"https://www.youtube.com/watch?v=xt1ILFe_Gg8\" target=\"_blank\">https://www.youtube.com/watch?v=xt1ILFe_Gg8</a></li><li>”Samsung's Smart Homes | CES 2018”. Gizmodo. <a href=\"https://youtu.be/PvUXxUJtM3k\" target=\"_blank\">https://youtu.be/PvUXxUJtM3k</a></li><li>”Best CES 2018 Smart Home Gadgets for an Amazing Home”. Smart Home Solver <a href=\"https://youtu.be/NX-9LivlJh0\" target=\"_blank\">https://youtu.be/NX-9LivlJh0</a></li><li>”Robotic Laundry Folding Machine”. FoldiMate Family™. <a href=\"https://www.youtube.com/watch?v=swNgjX0xHC8\" target=\"_blank\">https://www.youtube.com/watch?v=swNgjX0xHC8</a></li><li>\"MIT Media Lab CityHome - Smart furniture for small apartments\". Gadget-Help. <a href=\"https://www.youtube.com/watch?v=ODKaMdrgO8o\" target=\"_blank\">https://www.youtube.com/watch?v=ODKaMdrgO8o</a></li><li>\"Smart Showers? 5 High-Tech Bathroom Upgrades\". Consumer Reports. <a href=\"https://www.youtube.com/watch?v=Bw7qqXAUQAc\" target=\"_blank\">https://www.youtube.com/watch?v=Bw7qqXAUQAc</a></li><li>\"Smart bed makes itself\". Insider. <a href=\"https://www.youtube.com/watch?v=DRoMb6qQihY\" target=\"_blank\">https://www.youtube.com/watch?v=DRoMb6qQihY</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/gw_w0LUXEDw?start=18",
//                 "image": "",
//                 "text": "Smart Kitchen, tielsa"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "c069e5de-c8e1-4a7f-b314-877dbfa0bc1e"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "55.0000000000000000",
//             "median": 55,
//             "values": [
//                 55
//             ]
//         },
//         "rating_y": {
//             "avg": "29.0000000000000000",
//             "median": 29,
//             "values": [
//                 29
//             ]
//         },
//         "ratingCurrentY": 29,
//         "ratingCurrentX": 55
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "2154c85b-788f-4052-a513-ecb5189a6a54",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1924,
//         "updated_at": "2020-04-24T07:52:36.156Z",
//         "created_at": "2019-03-19T08:25:31.000Z",
//         "content": {
//             "type": "bf127402-abbe-42e7-b3c5-a8e46c76cfb0",
//             "title": "Solar Radiation Management",
//             "short_title": "Solar Radiation Management",
//             "summary": "<p>Solar radiation management (SRM) refers to solutions to reduce the impact of climate change by reflecting a part of inbound sunlight back out into space. SRM techniques are only just being developed, but at best they could potentially greatly help to combat climate change, at least in the short term. In the long term, however, using SRM techniques could have unpredictable and even irreversible consequences for the Earth.</p>",
//             "body": "<h2>Background</h2><p>A variety of different kind of SRM techniques have already been proposed. One of the solutions that have gained interest is to spread particulates or aluminium oxide into the upper atmosphere to reflect sunlight back to space. Another suggestion is to whiten clouds over oceans to increase their reflectivity. Any long-term effects of these methods – or any other SRM solutions – are not known and they are remarkably challenging to estimate.</p><p>It is worth noting that developing SRM techniques, let alone taking such into use, requires answering a wide range of open questions regarding, for instance, cause and effect, multiplier effects, subjects of research, and funding. Because any actions would have an impact on the entire atmosphere, the nation states would need to reach an agreement regarding which methods to use and who will carry out the plans.</p><p>The defenders of SRM view them as a potential emergency solution, to be used if other measures to combat climate change prove to be ineffective or they are carried out too late. In other words, even those who defend the SRM techniques only see them as a temporary solution mainly fit for providing some extra time to resolve the issues caused by climate change and help the humanity to transition towards a carbon-free economy.</p><p>The critics of SRM see the concept riddled with threats. They believe that global climate and ecosystem are so complex that any attempts to tamper with them could lead to unpredictable multiplier effects such as the ones that were seen in Australia when foxes and rabbits were introduced there, or worse. For instance, if aluminium oxide were released into the stratosphere to reflect the sunlight just before a supervolcano eruption, the use of nuclear weapons, a sudden stop of the Gulf Stream, or a large meteor hitting the Earth, it could lead to an environmental catastrophe even worse than climate change – and the SRM would have been a central cause of it.</p><h3>Additional Information</h3><ul><li>”What is SRM?”. Solar Radiation Management Governance Initiative. <a href=\"http://www.srmgi.org/what-is-srm/\" rel=\"noopener noreferrer\" target=\"_blank\">http://www.srmgi.org/what-is-srm/</a></li><li>Daisy Dunne, ”Explainer: six ideas to limit global warming with solar geoengineering”. Carbon Brief. <a href=\"https://www.carbonbrief.org/explainer-six-ideas-to-limit-global-warming-with-solar-geoengineering\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.carbonbrief.org/explainer-six-ideas-to-limit-global-warming-with-solar-geoengineering</a></li><li>”Geoengineering”. Harvard University. <a href=\"https://geoengineering.environment.harvard.edu/geoengineering\" rel=\"noopener noreferrer\" target=\"_blank\">https://geoengineering.environment.harvard.edu/geoengineering</a></li><li>”Solar radiation management”. Wikipedia. <a href=\"https://en.wikipedia.org/wiki/Solar_radiation_management\" rel=\"noopener noreferrer\" target=\"_blank\">https://en.wikipedia.org/wiki/Solar_radiation_management</a></li><li>Arthur Neslen, “US scientists launch world's biggest solar geoengineering study”. The Guardian. <a href=\"https://www.theguardian.com/environment/2017/mar/24/us-scientists-launch-worlds-biggest-solar-geoengineering-study\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.theguardian.com/environment/2017/mar/24/us-scientists-launch-worlds-biggest-solar-geoengineering-study</a></li></ul>",
//             "media": {
//                 "video": "https://www.youtube.com/embed/OBTVK8ajqa4?start=43",
//                 "image": "",
//                 "text": "A technofix for the climate? Atmospheric geoengineering (Solar Radiation Management), Heinrich-Böll-Stiftung"
//             },
//             "time_range": {
//                 "min": 2028,
//                 "max": 2040
//             },
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [],
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "wildcard",
//         "content-type-title": "Wild card",
//         "color": "none",
//         "rating_x": {
//             "avg": "35.0000000000000000",
//             "median": 35,
//             "values": [
//                 35
//             ]
//         },
//         "rating_y": {
//             "avg": "29.0000000000000000",
//             "median": 29,
//             "values": [
//                 29
//             ]
//         },
//         "ratingCurrentX": 35,
//         "ratingCurrentY": 29
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "3502370e-f137-466d-8898-4aed9d8b580c",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-12-10T12:01:38.000Z",
//         "created_at": "2018-12-10T12:01:38.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Hyperlocalisation",
//             "short_title": "Hyperlocalisation",
//             "summary": "Hyperlocalisation means the desire to produce everything locally and by oneself, be it food, services, consumer goods, news, culture, or energy. More and more people are looking for chances to fulfil their daily needs with locally produced alternatives that serve the values and goals they deem important.",
//             "body": "<h2>Background</h2><p>Hyperlocalisation is one manifestation of a new kind of ethical and ecological ethos; the desire to grow one’s own food is related to willingness to recycle. New ideas include growing crops on roofs and in restaurants or offices. The DIY (do it yourself) culture as a whole is a sphere of hyperlocalisation, as are self-produced furniture (crafts, 3D printed own designs) or gardening. Hyperlocalisation also includes local or self-produced news content.</p><p>Amidst all the pressure from market forces and strong multinational conglomerates, hyperlocalisation offers an alternative perspective, a softer and more local alternative for fulfilling basic needs and desires. On one hand, it deals with making things oneself, but it also deals with ideas of sharing, participating, and community building, which aims to support individuals’ and communities’ goals and wellbeing.</p><p>The underlying values often deal with economic, ecological, social, and cultural sustainability. Hyperlocalisation can just as well deal with traditional knowledge and skills as with utilising new technologies and research results, which enable improved opportunities for local production and sharing.</p><h2>Impact</h2><p>Hyperlocalisation also means that some people who used to be mere consumers now also become producers. Instead of consuming ready-made products, they can now be served with raw materials as well as products and services that enable or improve local production.</p><p>Alongside creating products and services themselves, people also give priority to locally produced goods. A growing demand for hyperlocal alternatives in a given field means that existing businesses must take these desires into account and answer to this call. If existing companies miss this opportunity, it is likely that new entrepreneurs or customers themselves start to build networks that enable the production and dissemination of hyperlocally produced goods entirely bypassing old channels and stakeholders.</p><h3>Additional Information</h3><ul><li>Andy Williams, ”Hyperlocal News in the UK: Its Current State and Future Prospects”. <a href=\"http://impress.press/news/hyperlocal-news-in-the-uk.html\" target=\"_blank\">http://impress.press/news/hyperlocal-news-in-the-uk.html</a></li><li>”Hyper-Local Restaurants: Growing Produce in Your Own Backyard”. <a href=\"http://www.webstaurantstore.com/blog/780/hyper-local-restaurants-growing-produce-in-your-own-backyard.html\" target=\"_blank\">http://www.webstaurantstore.com/blog/780/hyper-local-restaurants-growing-produce-in-your-own-backyard.html</a></li><li>Kimberley Mok, ”Brooklyn Microgrid: A Blockchain-based Platform for Locally Traded Electricity”. The New Stack. <a href=\"http://thenewstack.io/brooklyn-microgrid-blockchain-based-platform-locally-traded-electricity/\" target=\"_blank\">http://thenewstack.io/brooklyn-microgrid-blockchain-based-platform-locally-traded-electricity/</a></li><li>Daphne Howland, ”What is hyper-localization, and what does it mean for retailers?”. Retail Dive. <a href=\"http://www.retaildive.com/news/what-is-hyper-localization-and-what-does-it-mean-for-retailers/415092/\" target=\"_blank\">http://www.retaildive.com/news/what-is-hyper-localization-and-what-does-it-mean-for-retailers/415092/</a></li><li>”The Hyper-Local Economy”. NowSourcing. <a href=\"http://nowsourcing.com/project/the-hyper-local-economy/\" target=\"_blank\">http://nowsourcing.com/project/the-hyper-local-economy/</a></li><li>Janet Morrissey, ”Sharing Economy Goes Hyperlocal With a Growing Market for Household Items”. The New York Times. <a href=\"http://www.nytimes.com/2015/09/03/business/smallbusiness/sharing-economy-goes-hyperlocal-with-a-growing-market-for-household-items.html?_r=0\" target=\"_blank\">http://www.nytimes.com/2015/09/03/business/smallbusiness/sharing-economy-goes-hyperlocal-with-a-growing-market-for-household-items.html?_r=0</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/ffjxl2fyj8M",
//                 "image": "",
//                 "text": "Grow Your Own Organics & Reclaim Your Food!, Bite Size Vegan"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "ea500d06-3575-4821-aa89-0e4f72747783"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "86.0000000000000000",
//             "median": 86,
//             "values": [
//                 86
//             ]
//         },
//         "rating_y": {
//             "avg": "27.0000000000000000",
//             "median": 27,
//             "values": [
//                 27
//             ]
//         },
//         "ratingCurrentX": 86,
//         "ratingCurrentY": 27
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "0b372ce0-07d6-44ff-b1af-92753379c6a4",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-09-12T14:41:11.000Z",
//         "created_at": "2018-09-12T14:41:11.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Older than Ever",
//             "short_title": "Older than Ever",
//             "summary": "Most of us will live longer and more healthier lives than earlier generations. A number of estimated have stated that the average lifespan will increase by up to ten years. Ray Kurzweil, Google's leading futurist, even anticipates a great leap in human evolution: he claims that people of the future will live forever.\n",
//             "body": "<h2>Background</h2><p>Experts' estimates to the extent of the increase in life expectancy vary. If looked at from a statistical viewpoint (i.e. with a history orientation), life expectancy seems to increase moderately. However, when we look at the issue from the standpoint of scientific and technological development and foresight, the change seems more dramatic. Assessments based on current mortality rates cannot fully take into account scientific breakthroughs or the continuous improvement in the population's health.</p><p>In the near future spare parts for humans can be 3D printed or grown in laboratories. nanomedicine, gene therapy, and various other medical advancements will defeat some key diseases and extend the average lifespan dramatically. Widespread diseases, such as Alzheimer's or cancers will vanish.</p><h3>Additional Information</h3><ul><li>Philip Perry, \"The End of Aging? Soon It Might Be a Prescription Away\". Big Think. <a href=\"http://bigthink.com/philip-perry/pharma-guy-going-all-in-for-being-young-forever\" target=\"_blank\">http://bigthink.com/philip-perry/pharma-guy-going-all-in-for-being-young-forever</a></li><li>Kailey Baker &amp; Mark Prigg, “Have scientists found the key to eternal life? Discovery of how to switch off ageing process in worms could lead to mechanism being delayed in humans“. Mail online. <a href=\"http://www.dailymail.co.uk/sciencetech/article-3172594/It-s-downhill-hit-puberty-Researchers-pinpoint-exactly-bodies-start-age.html\" target=\"_blank\">http://www.dailymail.co.uk/sciencetech/article-3172594/It-s-downhill-hit-puberty-Researchers-pinpoint-exactly-bodies-start-age.html</a></li><li>Michael Fossel, ”Resetting DNA”. Ideacity. <a href=\"https://youtu.be/iVEJb_r5mgA?t=10m53s\" target=\"_blank\">https://youtu.be/iVEJb_r5mgA?t=10m53s</a></li><li>Brooke Borel, “The tricky ethics of living longer. A medical revolution aims to stave off age-related disease and extend our lives – but what will it mean for society?\". Popular Science. <a href=\"http://www.popsci.com/ethics-living-longer\" target=\"_blank\">http://www.popsci.com/ethics-living-longer</a></li><li>Ian Sample, ”Cancer tumour genetics reveal possible treatment revolution”. The Guardian. <a href=\"https://www.theguardian.com/science/2016/mar/03/genetics-of-cancer-tumours-reveal-possible-treatment-revolution\" target=\"_blank\">https://www.theguardian.com/science/2016/mar/03/genetics-of-cancer-tumours-reveal-possible-treatment-revolution</a></li><li>Zoë Corbyn, ”Live for ever: Scientists say they’ll soon extend life ‘well beyond 120’”. The Guardian. <a href=\"https://www.theguardian.com/science/2015/jan/11/-sp-live-forever-extend-life-calico-google-longevity\" target=\"_blank\">https://www.theguardian.com/science/2015/jan/11/-sp-live-forever-extend-life-calico-google-longevity</a></li><li>\"Genes linked to effects of mood and stress on longevity identified\". Science Daily. <a href=\"https://www.sciencedaily.com/releases/2016/05/160524085357.htm\" target=\"_blank\">https://www.sciencedaily.com/releases/2016/05/160524085357.htm</a></li><li>Brandt Ranj, “Google's chief futurist Ray Kurzweil thinks we could start living forever by 2029”. Business Insider. <a href=\"http://www.businessinsider.com/googles-chief-futurist-thinks-we-could-start-living-forever-by-2029-2016-4?r=US&amp;IR=T&amp;IR=T\" target=\"_blank\">http://www.businessinsider.com/googles-chief-futurist-thinks-we-could-start-living-forever-by-2029-2016-4?r=US&amp;IR=T&amp;IR=T</a></li><li>Lizzy Parry, “Six newly discovered proteins 'may unlock the secrets of how we age - paving the way for new treatments for Alzheimer's, cancer and diabetes”. Mail online. <a href=\"http://www.dailymail.co.uk/health/article-3536858/Six-newly-discovered-proteins-unlock-secrets-age-paving-way-new-treatments-Alzheimer-s-cancer-diabetes.html#ixzz4JZbSfREL\" target=\"_blank\">http://www.dailymail.co.uk/health/article-3536858/Six-newly-discovered-proteins-unlock-secrets-age-paving-way-new-treatments-Alzheimer-s-cancer-diabetes.html#ixzz4JZbSfREL</a></li><li>”The principles of living longer”. CNN. <a href=\"https://youtu.be/TQHYIDIP6XY\" target=\"_blank\">https://youtu.be/TQHYIDIP6XY</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/b6peu_bES-k?start=10",
//                 "image": "",
//                 "text": "Futurist on living forever, Ray Kurzweil, Tech Insider"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "8bbd0c8d-cbab-4692-ae08-a1ee5d9733a0"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "69.0000000000000000",
//             "median": 69,
//             "values": [
//                 69
//             ]
//         },
//         "rating_y": {
//             "avg": "26.0000000000000000",
//             "median": 26,
//             "values": [
//                 26
//             ]
//         },
//         "ratingCurrentY": 26,
//         "ratingCurrentX": 69
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "45638ebd-38ad-4456-b156-78af6811d5b6",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-10-09T17:11:30.000Z",
//         "created_at": "2018-10-09T17:11:30.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Floating Cities",
//             "short_title": "Floating Cities",
//             "summary": "Floating cities will become more common as floating homes and infrastructure solutions advance. This development is driven not only by the need to acquire more space for people, but also because floating cities and homes offer a whole new variety of alternatives for people who wish to live or spend time near water. Amsterdam, a city that is ever increasingly in need for new apartments has already built a whole neighbourhood on water.\n",
//             "body": "<h3>Additional Information</h3><ul><li>Katy Evans, ”Plans For World’s First \"Floating City\" To Be Built In The Pacific In Two Years' Time”. IFLScience. <a href=\"http://www.iflscience.com/technology/plans-for-worlds-first-floating-city-built-in-pacific-two-years-time/\" target=\"_blank\">http://www.iflscience.com/technology/plans-for-worlds-first-floating-city-built-in-pacific-two-years-time/</a></li><li>”Build It Bigger: Amsterdam Futuristic Floating City (Extreme Engineering, S0506)”. DGReviews. <a href=\"https://www.youtube.com/watch?v=Es74LezQUCs\" target=\"_blank\">https://www.youtube.com/watch?v=Es74LezQUCs</a></li><li>\"Dubai's floating homes are real\". Tech Insider. <a href=\"https://www.youtube.com/watch?v=VgrPMkU6EJ8\" target=\"_blank\">https://www.youtube.com/watch?v=VgrPMkU6EJ8</a></li><li>\"U.F.O. (Floating home)\". Jet Capsule. <a href=\"https://www.youtube.com/watch?v=ECLg053YlMM\" target=\"_blank\">https://www.youtube.com/watch?v=ECLg053YlMM</a></li><li>\"Futuristic floating city\". Tech Insider. <a href=\"https://www.youtube.com/watch?v=cVDcswq8t_w\" target=\"_blank\">https://www.youtube.com/watch?v=cVDcswq8t_w</a></li><li>”Futuristic city made of garbage”. Tech Insider. <a href=\"https://www.youtube.com/watch?v=p2Bv4dBGF2I\" target=\"_blank\">https://www.youtube.com/watch?v=p2Bv4dBGF2I</a></li><li>Nicole Jewell, \"Floating Blue 21 ecosystem offers a sustainable alternative to consumptive societies\". Inhabitat. <a href=\"http://inhabitat.com/floating-blue-21-ecosystem-offers-a-sustainable-alternative-to-consumptive-societies/\" target=\"_blank\">http://inhabitat.com/floating-blue-21-ecosystem-offers-a-sustainable-alternative-to-consumptive-societies/</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/UyBPUyRU31o",
//                 "image": "",
//                 "text": "Floating cities of the future, Tech Insider"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "beea3a14-e725-458d-a3e0-35c01d0853dd"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "32.0000000000000000",
//             "median": 32,
//             "values": [
//                 32
//             ]
//         },
//         "rating_y": {
//             "avg": "26.0000000000000000",
//             "median": 26,
//             "values": [
//                 26
//             ]
//         },
//         "ratingCurrentX": 32,
//         "ratingCurrentY": 26
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "7d4004c4-80ef-4064-a13f-198b0cbbe435",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1,
//         "updated_at": "2020-05-13T19:58:48.441Z",
//         "created_at": "2020-02-27T09:31:07.000Z",
//         "content": {
//             "title": "new timing test",
//             "short_title": "new timing test",
//             "summary": "<p>new timing test</p>",
//             "body": "",
//             "type": "6528f835-0637-4dfb-8916-474b8053d68d",
//             "media": {
//                 "video": "",
//                 "image": "/file/20191112_135404.81824da9-e714-4ead-b220-1bf9758d0e94.jpg",
//                 "text": ""
//             },
//             "related_phenomena": [
//                 "7d4004c4-80ef-4064-a13f-198b0cbbe435",
//                 "8f60d7f6-5360-4076-9682-091d6124f691",
//                 "6425a4a5-8d1f-4084-bf0c-87c989c154f9",
//                 "88064277-0975-4095-8ca8-dbe66b5e52a2"
//             ],
//             "feed_tags": [],
//             "time_range": {
//                 "min": 2040,
//                 "max": 2120
//             },
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "summary",
//         "content-type-title": "Summary",
//         "color": "none",
//         "rating_x": {
//             "avg": "10.0000000000000000",
//             "median": 10,
//             "values": [
//                 10
//             ]
//         },
//         "rating_y": {
//             "avg": "26.0000000000000000",
//             "median": 26,
//             "values": [
//                 26
//             ]
//         },
//         "ratingCurrentY": 26,
//         "ratingCurrentX": 10
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "ba21241d-7f89-46b9-acc6-281f659d4b40",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-09-10T07:08:05.000Z",
//         "created_at": "2018-09-10T07:08:05.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Underwater Life",
//             "short_title": "Underwater Life",
//             "summary": "Water covers over 70% of the earth's surface. Population growth and the expanding of large cities have turned attention towards the oceans and lakes. Consequently, more and more human-made infrastructure allowing long-term stay has been built underwater.",
//             "body": "<h2>Background</h2><p>Hotels and restaurants in various parts of the world already offer their guests underwater views. Even though a large portion of underwater life revolves around travel and experience industries or scientific research, the situation may change a lot in coming decades.</p><p>For example, floating and underwater cities of the future are designed in Europe, China, and Japan alike. The technology needed for such infrastructure projects is constantly developed. These technologies are not limited to enabling large-scale human life underwater, but they also aim for the efficient utilisation of the sea's potential in, for example, production of sustainable energy and drinking water.</p><h3>Additional Information</h3><ul><li>Jacopo Prisco &amp; Ana Rosado, ”Europe's first underwater restaurant to open in Norway”. CNN. <a href=\"http://edition.cnn.com/style/article/snohetta-underwater-restaurant/index.html\" target=\"_blank\">http://edition.cnn.com/style/article/snohetta-underwater-restaurant/inde...</a></li><li>Kate Springer, ”These next-level underwater villas are making waves”. CNN. <a href=\"http://edition.cnn.com/style/article/floating-underwater-villas/index.html\" target=\"_blank\">http://edition.cnn.com/style/article/floating-underwater-villas/index.html</a></li><li>\"10 Incredible Structures Built Underwater\". TheRichest. <a href=\"https://www.youtube.com/watch?v=H0r1bPOmil0\" target=\"_blank\">https://www.youtube.com/watch?v=H0r1bPOmil0</a></li><li>Megan Willett, \"The future of tourism is a $20 million hotel that takes guests 30 feet underwater\". Tech Insider. <a href=\"http://www.techinsider.io/planet-ocean-underwater-hotel-2015-12\" target=\"_blank\">http://www.techinsider.io/planet-ocean-underwater-hotel-2015-12</a></li><li>Amy Frearson, \"Floating City concept by AT Design Office features underwater roads and submarines\". Dezeen. <a href=\"http://www.dezeen.com/2014/05/13/floating-city-at-design-office/\" target=\"_blank\">http://www.dezeen.com/2014/05/13/floating-city-at-design-office/</a></li><li>Amy Frearson, \"Spiralling underwater cities could make oceans inhabitable by 2030\". Dezeen. <a href=\"http://www.dezeen.com/2014/11/26/ocean-spiral-underwater-cities-shimizu-corporation/\" target=\"_blank\">http://www.dezeen.com/2014/11/26/ocean-spiral-underwater-cities-shimizu-...</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/E6ezeHC2uAM",
//                 "image": "",
//                 "text": "Japanese Firm Unveils Design For Underwater City, GeoBeats"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "98f6b51e-5eb3-482f-b1e2-9bc1d6530012"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "70.0000000000000000",
//             "median": 70,
//             "values": [
//                 70
//             ]
//         },
//         "rating_y": {
//             "avg": "25.0000000000000000",
//             "median": 25,
//             "values": [
//                 25
//             ]
//         },
//         "ratingCurrentY": 25,
//         "ratingCurrentX": 70
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "b61ce3b0-8539-4d94-b355-67442bd46f6b",
//         "type": "phenomenon",
//         "language": "en",
//         "content": {
//             "title": "Opoint Test ",
//             "short_title": "Opoint",
//             "summary": "<p>Summary\t</p>",
//             "body": "<p>Main Content</p>",
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "media": {
//                 "video": "",
//                 "image": "",
//                 "text": ""
//             },
//             "related_phenomena": [
//                 "64c2f73c-bd6b-4081-aa8c-0d808dcd0969",
//                 "468e99d6-25f1-4066-93fe-82b41d31ef36",
//                 "a96f9455-45ec-4086-95b9-e8e0eb3c8f75"
//             ],
//             "feed_tags": [],
//             "time_range": {
//                 "min": 2023,
//                 "max": 2043
//             },
//             "links": []
//         },
//         "archived": false,
//         "updated_by": 1,
//         "created_by": 1,
//         "created_at": "2020-09-07T07:41:40.666Z",
//         "updated_at": "2020-09-07T07:41:40.666Z",
//         "tags_fp:docs/props/has": [
//             "fp:tags/theme/automation-ai-and-robotisation",
//             "fp:tags/theme/business-and-value-chains",
//             "fp:tags/theme/climate-change"
//         ],
//         "tags": [
//             "fp:tags/theme/automation-ai-and-robotisation",
//             "fp:tags/theme/business-and-value-chains",
//             "fp:tags/theme/climate-change"
//         ],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "56.0000000000000000",
//             "median": 56,
//             "values": [
//                 56
//             ]
//         },
//         "rating_y": {
//             "avg": "24.0000000000000000",
//             "median": 24,
//             "values": [
//                 24
//             ]
//         },
//         "ratingCurrentX": 56,
//         "ratingCurrentY": 24
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "b2d51ec0-9dfd-4920-93dc-11798f43e403",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 4755,
//         "created_by": 4755,
//         "updated_at": "2018-11-10T09:10:54.000Z",
//         "created_at": "2018-11-10T09:10:54.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Atmosphere Design",
//             "short_title": "Atmosphere Design",
//             "summary": "The design culture regarding business and service spaces has long concentrated on technical and economic issues and hardly any attention has been paid to the design atmospheres. In the near future, the atmosphere offered for the customer and comprehensive brand experiences rise to key roles in customers’ product and service consumption.",
//             "body": "<h2>Background</h2><p>Future business and service locations will be able to offer a variety of moods and atmospheres that can be tailored, modified, and adjusted according to users’ needs and wishes or the context of use in real time or modified based on a pre-determined logic with the help of changing audio, olfactory, lighting, colour, and image schemes. Comprehensive experiences are created through atmospheres that serve all senses and offer a variety of sensations.</p><p>Atmospheres cannot be created merely by creating passive multi-sensory spaces, services, or brands, but by promoting customers’ active interaction with the business or service space and by allowing them to control the space via voices, gestures, touches, or motion.</p><p>Examples of atmosphere design could include a waiting room with a predefined set of atmospheric choices, which customers can vote on or an apartment hotel for seniors, where all spaces and services have been designed to be game-like and to have positive health impacts.</p><h2>Impact</h2><p>Business and service spaces need to offer increasingly comprehensive purchasing and service experiences in order to provide customers with unique new value. A good atmosphere improves customer satisfaction and creates returning customers who have received quality service and have been regarded as individuals. Atmosphere design is of particular importance to businesses who compete with online shopping or companies whose services can in the future be conducted by the customers themselves at home.</p><h3>Additional Information</h3><ul><li>”Glimpse the Store of the Future”. Bloomberg. <a href=\"https://youtu.be/wr28_Pmg1Ag\" target=\"_blank\">https://youtu.be/wr28_Pmg1Ag</a></li><li>”The power of scent marketing. Empowering businesses, enhancing brands”. Aroma Marketing. <a href=\"https://www.youtube.com/watch?v=HxXEGyh68ZM\" target=\"_blank\">https://www.youtube.com/watch?v=HxXEGyh68ZM</a></li><li>”The Store of the Future”. Electric Runway. <a href=\"https://www.youtube.com/watch?v=IKouQFI1aM4\" target=\"_blank\">https://www.youtube.com/watch?v=IKouQFI1aM4</a></li><li>Joe Bardi, ”Virtual Reality (and AR) retail visual merchandising ideas: Top 4 reasons AR and VR are made for visual marketing”. Marxent Labs. <a href=\"http://www.marxentlabs.com/four-ways-virtual-augmented-reality-improve-visual-marketing/\" target=\"_blank\">http://www.marxentlabs.com/four-ways-virtual-augmented-reality-improve-visual-marketing/</a></li><li>Blake Morgan, ”Five Trends Shaping The Future Of Customer Experience In 2017”. Forbes. <a href=\"https://www.forbes.com/sites/blakemorgan/2016/12/05/five-trends-shaping-the-future-of-customer-experience-in-2017/#264251495f82\" target=\"_blank\">https://www.forbes.com/sites/blakemorgan/2016/12/05/five-trends-shaping-the-future-of-customer-experience-in-2017/#264251495f82</a></li><li>Chuck Longanecker, ”Customer Experience Is the Future of Design”. UX Magazine. <a href=\"http://uxmag.com/articles/customer-experience-is-the-future-of-design\" target=\"_blank\">http://uxmag.com/articles/customer-experience-is-the-future-of-design</a></li></ul>",
//             "media": {
//                 "video": "http://www.youtube.com/embed/M_ZSg07_FBY?start=13",
//                 "image": "",
//                 "text": "Reinventing Retail: Experience-Driven Commerce, Rachel Shechtman, Future of StoryTelling"
//             },
//             "time_range": null,
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "0b31df4c-70a3-441a-91ae-db5dbcba293e"
//             ]
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "75.0000000000000000",
//             "median": 75,
//             "values": [
//                 75
//             ]
//         },
//         "rating_y": {
//             "avg": "22.0000000000000000",
//             "median": 22,
//             "values": [
//                 22
//             ]
//         },
//         "ratingCurrentY": 22,
//         "ratingCurrentX": 75
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "b3dd6b7e-5c12-4dd0-a0d8-f1b9728245aa",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1924,
//         "updated_at": "2020-04-24T07:53:05.245Z",
//         "created_at": "2019-03-19T07:28:15.000Z",
//         "content": {
//             "type": "bf127402-abbe-42e7-b3c5-a8e46c76cfb0",
//             "title": "Asteroid Mining",
//             "short_title": "Asteroid Mining",
//             "summary": "<p>Within just a few decades, mining asteroids may become not only technically possible but also economically viable. Claiming the untapped resources waiting in space may, however, become a frantic and disorganized race not completely unlike the American frontier or Klondike Gold Rush.</p>",
//             "body": "<h2>Background</h2><p>Asteroids that contain different metals have caught widespread interest. At the moment it is unclear, however, how large a portion of the asteroids reachable to humans may contain something worth mining and how those resources could be transported back to Earth.</p><p>According to some views, minerals mined in space should not be shipped back to Earth at all but rather be used to construct space-based telecommunication infrastructure and other facilities. Furthermore, it has been suggested that the first resource to be exploited should not be minerals but water, which could be turned into rocket fuel to replenish the engines.</p><h2>Impacts</h2><p>Due to lack of international legislation, asteroid mining is feared to become the new gold rush. In the present political climate, in which international treaties do not enjoy widespread adherence, no great mutual understanding is likely to be achieved in the coming years.</p><p>If asteroid mining takes off in the coming decades, it will likely have a notable impact on both the global economy and the political environment. Suddenly, some raw materials may be available in unlimited quantities, which would be reflected in their prices as well as tax revenues of the nations that produce them. In turn, the nations first to tap into the riches of space may come to possess technological and material advantages not just here on Earth but also when it comes to the conquest of space.</p><h3>Additional Information</h3><ul><li>“Asteroid mining news”. Mining. <a href=\"http://www.mining.com/tag/asteroid-mining/\" rel=\"noopener noreferrer\" target=\"_blank\">http://www.mining.com/tag/asteroid-mining/</a></li><li>Philip Metzger, “How asteroid mining could save the planet”. The Week. <a href=\"http://theweek.com/articles/748563/how-asteroid-mining-could-save-planet\" rel=\"noopener noreferrer\" target=\"_blank\">http://theweek.com/articles/748563/how-asteroid-mining-could-save-planet</a></li><li>Andrew Wong, “Space mining could become a real thing – and it could be worth trillions”. CNBC. <a href=\"https://www.cnbc.com/2018/05/15/mining-asteroids-could-be-worth-trillions-of-dollars.html\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.cnbc.com/2018/05/15/mining-asteroids-could-be-worth-trillion...</a></li><li>Karla Lant, “NASA is fast-tracking plans to explore a metal asteroid worth $10, 000 quadrillion”. Futurism. <a href=\"https://futurism.com/nasa-fast-tracking-plans-explore-metal-asteroid-worth-10000-quadrillion/\" rel=\"noopener noreferrer\" target=\"_blank\">https://futurism.com/nasa-fast-tracking-plans-explore-metal-asteroid-wor...</a></li><li>Abigail Beall, “Space mining is going to seriously disrupt Earth’s economy. And we’re nowhere near ready for the shock”. Wired.&nbsp;<a href=\"http://www.wired.co.uk/article/international-laws-are-not-ready-for-space-mining\" rel=\"noopener noreferrer\" target=\"_blank\">http://www.wired.co.uk/article/international-laws-are-not-ready-for-spac...</a></li><li>Kristin Houser, “Falcon heavy could make asteroid mining a reality”. Futurism. <a href=\"https://futurism.com/falcon-heavy-asteroid-mining/\" rel=\"noopener noreferrer\" target=\"_blank\">https://futurism.com/falcon-heavy-asteroid-mining/</a></li><li>Amanda Jane Hughes, “Mining asteroids could unlock untold wealth – here’s how to get started”. The Conversation. <a href=\"https://theconversation.com/mining-asteroids-could-unlock-untold-wealth-heres-how-to-get-started-95675\" rel=\"noopener noreferrer\" target=\"_blank\">https://theconversation.com/mining-asteroids-could-unlock-untold-wealth-...</a></li><li>Gbenga Odunta, “Who owns space? US asteroid-mining act is dangerous and potentially illegal”. The Conversation. <a href=\"https://theconversation.com/who-owns-space-us-asteroid-mining-act-is-dangerous-and-potentially-illegal-51073\" rel=\"noopener noreferrer\" target=\"_blank\">https://theconversation.com/who-owns-space-us-asteroid-mining-act-is-dan...</a></li><li>“Asteroid mining”. Wikipedia. <a href=\"https://en.wikipedia.org/wiki/Asteroid_mining\" rel=\"noopener noreferrer\" target=\"_blank\">https://en.wikipedia.org/wiki/Asteroid_mining</a></li></ul>",
//             "media": {
//                 "video": "https://www.youtube.com/embed/erF17yO9VsE?start=102",
//                 "image": "",
//                 "text": "Asteroid mining, Explaining TheFuture"
//             },
//             "time_range": {
//                 "min": 2028,
//                 "max": 2040
//             },
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "4dcf6f74-27db-4d72-bd48-b3c4e7e4baf9"
//             ],
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "wildcard",
//         "content-type-title": "Wild card",
//         "color": "none",
//         "rating_x": {
//             "avg": "57.0000000000000000",
//             "median": 57,
//             "values": [
//                 57
//             ]
//         },
//         "rating_y": {
//             "avg": "21.0000000000000000",
//             "median": 21,
//             "values": [
//                 21
//             ]
//         },
//         "ratingCurrentY": 21,
//         "ratingCurrentX": 57
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "02faf7ea-f23f-40d1-aad0-ab881bd75088",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 90036,
//         "created_by": 1,
//         "updated_at": "2020-09-07T07:51:42.966Z",
//         "created_at": "2020-01-16T13:58:51.000Z",
//         "content": {
//             "type": "bf127402-abbe-42e7-b3c5-a8e46c76cfb0",
//             "title": "Public test",
//             "short_title": "",
//             "summary": "<p>public content type type, content.</p>",
//             "body": "<p>test content</p>",
//             "media": {
//                 "video": "",
//                 "image": "",
//                 "text": ""
//             },
//             "time_range": {
//                 "min": 2020,
//                 "max": 2023
//             },
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [],
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "wildcard",
//         "content-type-title": "Wild card",
//         "color": "none",
//         "rating_x": {
//             "avg": "12.0000000000000000",
//             "median": 12,
//             "values": [
//                 12
//             ]
//         },
//         "rating_y": {
//             "avg": "21.0000000000000000",
//             "median": 21,
//             "values": [
//                 21
//             ]
//         },
//         "ratingCurrentX": 12,
//         "ratingCurrentY": 21
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "64c2f73c-bd6b-4081-aa8c-0d808dcd0969",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1,
//         "updated_at": "2020-04-24T07:50:58.310Z",
//         "created_at": "2020-02-10T10:53:02.000Z",
//         "content": {
//             "type": "bf127402-abbe-42e7-b3c5-a8e46c76cfb0",
//             "title": "test new wild",
//             "short_title": "",
//             "summary": "",
//             "body": "",
//             "media": {
//                 "video": "",
//                 "image": "",
//                 "text": ""
//             },
//             "time_range": {
//                 "min": 2020,
//                 "max": 2023
//             },
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "003e1486-32a2-40da-9151-7f7729bf3fa5"
//             ],
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "wildcard",
//         "content-type-title": "Wild card",
//         "color": "none",
//         "rating_x": {
//             "avg": "78.0000000000000000",
//             "median": 78,
//             "values": [
//                 78
//             ]
//         },
//         "rating_y": {
//             "avg": "19.0000000000000000",
//             "median": 19,
//             "values": [
//                 19
//             ]
//         },
//         "ratingCurrentY": 19,
//         "ratingCurrentX": 78
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "88064277-0975-4095-8ca8-dbe66b5e52a2",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1,
//         "updated_at": "2020-04-24T07:51:27.222Z",
//         "created_at": "2020-01-14T14:31:32.000Z",
//         "content": {
//             "type": "fe60cbdc-fac6-4bac-9781-02824b05f63c",
//             "title": "23",
//             "short_title": "",
//             "summary": "",
//             "body": "",
//             "media": {
//                 "video": "",
//                 "image": "",
//                 "text": ""
//             },
//             "time_range": {
//                 "min": 2028,
//                 "max": 2040
//             },
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [],
//             "links": []
//         },
//         "tags_fp:docs/props/has": [
//             "fp:tags/theme/business-and-value-chains",
//             "fp:tags/theme/automation-ai-and-robotisation"
//         ],
//         "tags": [
//             "fp:tags/theme/business-and-value-chains",
//             "fp:tags/theme/automation-ai-and-robotisation"
//         ],
//         "content-type-alias": "undefined",
//         "content-type-title": "(no type)",
//         "color": "none",
//         "rating_x": {
//             "avg": "20.0000000000000000",
//             "median": 20,
//             "values": [
//                 20
//             ]
//         },
//         "rating_y": {
//             "avg": "18.0000000000000000",
//             "median": 18,
//             "values": [
//                 18
//             ]
//         },
//         "ratingCurrentY": 18,
//         "ratingCurrentX": 20
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "62a6ff5a-4811-4658-98af-c6623ee5a125",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1,
//         "updated_at": "2020-04-24T07:52:24.394Z",
//         "created_at": "2019-03-19T08:33:48.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Wood-based Textiles",
//             "short_title": "Wood-based Textiles",
//             "summary": "<p>Wood-based cellulose can be used to make textile fibres suitable for clothes manufacturing. Cellulose fibres are expected to offer an ecologically sound and sustainable alternative for cotton, which is currently widely used in the clothing industry. Particularly countries heavily reliant on forestry may see wood-based textiles becoming an important source of income in the future.</p>",
//             "body": "<h2>Background</h2><p>Out of all the organic materials on Earth, cellulose is the most common. For this reason, it may be used for an even wider range of different purposes in the future. As climate change and limits on natural resources guide global development towards a more sustainable economy, cellulose may replace both cotton and synthetic materials in the clothing industry. Compared to them, cellulose can be produced more sustainably and it is friendlier to the environment. In addition, unlike cotton, it does not require valuable agricultural land or need large-scale watering.&nbsp;</p><p>Further investments in research and manufacturing are required before wood-based textiles can be taken into wider use. If the current trend towards more environmentally sustainable materials continues, however, it will be the forests that produce the majority of materials needed for the clothing industry, not the cotton fields. Ethical consumers will play a central role in bringing wood-based clothes to the mainstream.</p><h3>Additional Information</h3><ul><li>”Cellulose-based fibres will open a new future for Finnish textile industry”. Business Finland. <a href=\"https://www.businessfinland.fi/en/whats-new/news/2018/cellulose-based-fibres-will-open-a-new-future-for-finnish-textile-industry/\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.businessfinland.fi/en/whats-new/news/2018/cellulose-based-fibres-will-open-a-new-future-for-finnish-textile-industry/</a></li><li>Timo Nykänen, ”Fantastic fibres”. Metsä Fibre. <a href=\"https://www.metsafibre.com/en/media/echo/Pages/Fantastic-fibres.aspx\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.metsafibre.com/en/media/echo/Pages/Fantastic-fibres.aspx</a></li><li>”Cellulose for textiles”. Rise. <a href=\"http://www.innventia.com/en/Our-Expertise/Chemical-Pulping-and-bleaching/Biorefinery-products/Specialty-cellulose-for-textiles/\" rel=\"noopener noreferrer\" target=\"_blank\">http://www.innventia.com/en/Our-Expertise/Chemical-Pulping-and-bleaching/Biorefinery-products/Specialty-cellulose-for-textiles/</a></li><li>”Wood based textile fibres”. VTT. <a href=\"https://www.vttresearch.com/services/bioeconomy/biobased-materials/wood-based-textile-fibres\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.vttresearch.com/services/bioeconomy/biobased-materials/wood-based-textile-fibres</a></li></ul>",
//             "media": {
//                 "video": "https://www.youtube.com/embed/GQM0DJ2t9E0?start=11",
//                 "image": "",
//                 "text": "From wood cellulose to textile fibres, Tampere University of Technology"
//             },
//             "time_range": {
//                 "min": 2020,
//                 "max": 2023
//             },
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [],
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "20.0000000000000000",
//             "median": 20,
//             "values": [
//                 20
//             ]
//         },
//         "rating_y": {
//             "avg": "16.0000000000000000",
//             "median": 16,
//             "values": [
//                 16
//             ]
//         },
//         "ratingCurrentX": 20,
//         "ratingCurrentY": 16
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "fb9b01af-97c1-4001-abc3-05447fdaef79",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1,
//         "updated_at": "2020-09-07T07:51:11.526Z",
//         "created_at": "2020-02-28T13:59:46.000Z",
//         "content": {
//             "type": "43fa863e-26ca-470c-8588-cf162cba08b5",
//             "title": "Change in Countries, States, and Regions 2027",
//             "short_title": "Countries 2027",
//             "summary": "<p>a short summary</p>",
//             "body": "<p>In the medium term, the centre of gravity of the global economy will shift more and more to Asia, particularly to China, but, on the other hand, however, it is also entirely possible that China, which stimulates its economic growth with borrowed money, may collapse. New conflicts may break out in the Middle-East and Africa, which could result in several new failed states. If there will a be a new global economic crisis, and at the same time the EU would face a renewed wave of millions of refugees, the entire EU, and especially the Eurozone, might, following the example of Brexit, fall apart. This development could also lead to the disintegration of Russia, which probably would not happen peacefully. However, it is somewhat more likely that the emerging crises can be managed, at least to some extent.</p>",
//             "media": {
//                 "video": "https://www.youtube.com/embed/OWT-_VhW38g",
//                 "image": "",
//                 "text": "China's Economy Is Running on Borrowed Money – and Time, Ruchir Sharma, Big Think"
//             },
//             "time_range": {
//                 "min": 2022,
//                 "max": 2024
//             },
//             "related_phenomena": [
//                 "2993b46b-0fb3-45a7-a6be-55d2f322244b",
//                 "ec6bc07c-b79d-4130-bae6-6b606af27456",
//                 "874d2281-6c3f-465e-8578-773cb00587d0",
//                 "566554eb-d1a1-4490-a6a2-75e04fc97097",
//                 "dc340b37-9e93-486a-9c68-8959480532f6",
//                 "fd7f61ec-4cd0-4c39-8cac-a5b5a4cc3765",
//                 "9c947eb6-4790-46da-8f7f-cffdc205a04b",
//                 "dd213f31-ef6f-4b7a-9d3e-4afbb91e3328",
//                 "a1c30a4b-c0a5-44a3-9859-bad0b730322e",
//                 "05d37c34-b5b3-4d4d-a047-71af6cee08c1",
//                 "22bbc035-065a-448a-99d0-72b4d0694be8",
//                 "eef07f70-82e0-48de-9a1f-bfab6a6562e6",
//                 "3502370e-f137-466d-8898-4aed9d8b580c",
//                 "ec288a9f-960f-4246-91b3-9b9643f42209",
//                 "6a86ef22-00df-43d7-90eb-486f7a1f206c",
//                 "62585175-dfd0-4f65-bfb3-3ceda04fe763",
//                 "0c406565-c7c6-40d2-add2-d660c1a05e36",
//                 "abe9c5a1-2f6d-47dc-9055-03f8e8cb50fc",
//                 "4e6391ae-872b-41a0-8d2a-403f3a354b0b",
//                 "a94d2629-81c5-43e3-9f5b-70ca194a18b7",
//                 "42d15896-a51e-49e8-8f33-81c6b1b3a0c8",
//                 "e2eddba5-81b0-4e0e-8f89-f4edb34fae2b",
//                 "810b6bd7-2c37-4d24-bb3e-155f28fb19ad",
//                 "7f59d748-aa07-485b-bc73-d754d7d7e17c",
//                 "ce7a0212-42b8-488c-b446-007b30029343"
//             ],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [],
//             "links": []
//         },
//         "tags_fp:docs/props/has": [
//             "fp:tags/theme/automation-ai-and-robotisation",
//             "fp:tags/theme/business-and-value-chains"
//         ],
//         "tags": [
//             "fp:tags/theme/automation-ai-and-robotisation",
//             "fp:tags/theme/business-and-value-chains"
//         ],
//         "content-type-alias": "rising",
//         "content-type-title": "Strengthening",
//         "color": "none",
//         "rating_x": {
//             "avg": "21.0000000000000000",
//             "median": 21,
//             "values": [
//                 21
//             ]
//         },
//         "rating_y": {
//             "avg": "15.0000000000000000",
//             "median": 15,
//             "values": [
//                 15
//             ]
//         },
//         "ratingCurrentX": 21,
//         "ratingCurrentY": 15
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "468e99d6-25f1-4066-93fe-82b41d31ef36",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1,
//         "updated_at": "2020-04-24T07:51:07.804Z",
//         "created_at": "2020-01-16T14:21:46.000Z",
//         "content": {
//             "type": "fe60cbdc-fac6-4bac-9781-02824b05f63c",
//             "title": "Public test 22 edit 2",
//             "short_title": "Public test 2 short",
//             "summary": "<p>Public test lead weakening 2</p>",
//             "body": "<p>test content</p>",
//             "media": {
//                 "video": "",
//                 "image": "https://fp-dev.sangre.fi/file/paavo1.0a8d15ba-8a18-416a-ab9c-0128da75af28.jpg",
//                 "text": ""
//             },
//             "time_range": {
//                 "min": 2020,
//                 "max": 2023
//             },
//             "related_phenomena": [
//                 "02faf7ea-f23f-40d1-aad0-ab881bd75088",
//                 "ecb45d41-3848-4076-8b49-7c35a8c963ca"
//             ],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "003e1486-32a2-40da-9151-7f7729bf3fa5"
//             ],
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "undefined",
//         "content-type-title": "(no type)",
//         "color": "none",
//         "rating_x": {
//             "avg": "4.0000000000000000",
//             "median": 4,
//             "values": [
//                 4
//             ]
//         },
//         "rating_y": {
//             "avg": "6.0000000000000000",
//             "median": 6,
//             "values": [
//                 6
//             ]
//         },
//         "ratingCurrentY": 6,
//         "ratingCurrentX": 4
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "ba629f00-8b35-40ee-ba88-fa75598a5c4a",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1,
//         "updated_at": "2020-04-24T07:51:56.661Z",
//         "created_at": "2019-09-18T11:53:29.000Z",
//         "content": {
//             "type": "fe60cbdc-fac6-4bac-9781-02824b05f63c",
//             "title": "Double Test #2",
//             "short_title": "",
//             "summary": "<p>Lead text</p>",
//             "body": "<p>main content</p>",
//             "media": {
//                 "video": "",
//                 "image": "",
//                 "text": ""
//             },
//             "time_range": {
//                 "min": 2020,
//                 "max": 2023
//             },
//             "related_phenomena": [],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [],
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "undefined",
//         "content-type-title": "(no type)",
//         "color": "none",
//         "rating_x": {
//             "avg": "5.0000000000000000",
//             "median": 5,
//             "values": [
//                 5
//             ]
//         },
//         "rating_y": {
//             "avg": "5.0000000000000000",
//             "median": 5,
//             "values": [
//                 5
//             ]
//         },
//         "ratingCurrentY": 5,
//         "ratingCurrentX": 5
//     },
//     {
//         "groups": [
//             0
//         ],
//         "id": "ecb45d41-3848-4076-8b49-7c35a8c963ca",
//         "type": "phenomenon",
//         "archived": false,
//         "language": "en",
//         "updated_by": 1,
//         "created_by": 1,
//         "updated_at": "2020-04-15T10:37:40.982Z",
//         "created_at": "2020-01-15T11:44:51.000Z",
//         "content": {
//             "type": "fe60cbdc-fac6-4bac-9781-02824b05f63c",
//             "title": "test",
//             "short_title": "test",
//             "summary": "",
//             "body": "",
//             "media": {
//                 "video": "",
//                 "image": "",
//                 "text": ""
//             },
//             "time_range": {
//                 "min": 2025,
//                 "max": 2040
//             },
//             "related_phenomena": [
//                 "4678aaf5-fafb-4b18-9f64-2eea9453d604"
//             ],
//             "megatrend": "6aa6e207-b061-4721-be30-aa39ef28e17d",
//             "feed_tags": [
//                 "003e1486-32a2-40da-9151-7f7729bf3fa5"
//             ],
//             "links": []
//         },
//         "tags": [],
//         "content-type-alias": "undefined",
//         "content-type-title": "(no type)",
//         "color": "none",
//         "rating_x": {
//             "avg": "4.0000000000000000",
//             "median": 4,
//             "values": [
//                 4
//             ]
//         },
//         "rating_y": {
//             "avg": "1.00000000000000000000",
//             "median": 1,
//             "values": [
//                 1
//             ]
//         },
//         "ratingCurrentX": 4,
//         "ratingCurrentY": 1
//     }
// ]

  const [visibleDialog, setVisibleDialog] = useState(false)
  const [visibleText, setVisibleText] = useState(true)
  const [appContext, setAppContext] = useState({})
  const { axis, scatterSvg } = appContext
  const [isAverage, setIsAverage] = useState(true)

  const innerTexts = [
    { x: 25, y: 25, title: axisLabel3 },
    { x: 75, y: 25, title: axisLabel4 },
    { x: 25, y: 75, title: axisLabel5 },
    { x: 75, y: 75, title: axisLabel6 }
  ]
  const innerLineData = [
    {
      x1: -1500,
      y1: 50,
      x2: 1500,
      y2: 50
    },
    {
      x1: 50,
      y1: -1500,
      x2: 50,
      y2: 1500
    }
  ]

  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  }

  const maxTextWidth = 90

  const rectNodes = React.useMemo(() => {
    return [
      {
        x: 0,
        y: 100,
        width: containerWidth,
        height: containerHeight
      }
    ]
  }, [containerWidth, containerHeight])

  const setNodeColor = (phenomenon) => {
    let innerStroke = 'transparent'
    let outerStroke = 'transparent'
    let fillSymbol = 'rgb(0, 202, 141)'

    if (phenomenon['content-type-alias'] === 'summary') {
      innerStroke = '#fff'
    }

    if (phenomenon['content-type-alias'] === 'rising') {
      innerStroke = 'transparent'
    }

    if (phenomenon['content-type-alias'] === 'weaksignal') {
      innerStroke = 'transparent'
      fillSymbol = 'rgb(168, 168, 168)'
    }

    if (phenomenon['content-type-alias'] === 'cooling') {
      innerStroke = 'transparent'
      fillSymbol = 'rgb(0, 152, 255)'
    }

    if (phenomenon['content-type-alias'] === 'wildcard') {
      innerStroke = 'transparent'
      fillSymbol = 'rgb(233, 87, 87)'
    }
    return { innerStroke, outerStroke, fillSymbol }
  }

  const nodeListAsMedian = React.useMemo(() => {
    let nodes = []
    !!phenomena?.length && phenomena.map((phen) => {
      if (phen['rating_x']['median'] !== null && phen['rating_y']['median'] !== null) {
        const { innerStroke, outerStroke, fillSymbol } = setNodeColor(phen)
        let node = {}
        node['id'] = phen['id']
        node['color'] = phen['color']
        node['content-type-alias'] = phen['content-type-alias']

        if (phen?.color === 'none') {
          if ((node['content-type-alias'] !== undefined) || node['content-type-alias'] !== 'undefined') {
            // normal nodes
            node['type'] = [].concat({ innerStroke, outerStroke, fillSymbol })
          } else {
             // undefined types
          node['type'] = [].concat({ innerStroke , outerStroke, fillSymbol })
          }
        } 
        else {
          // customer custom types
          node['type'] = [].concat({ innerStroke, outerStroke: 'transparent', fillSymbol: phen.color })
        }

        node['title'] = String(phen['content']['short_title']) || String(phen['content']['title'])
        node['x'] = phen['rating_x']['median']
        node['y'] = phen['rating_y']['median']
        node['avg'] = false

        nodes.push(node)
      }
    })
    return nodes
  }, [phenomena])

  const nodeListAsAverage = React.useMemo(() => {
    let nodes = []

    !!phenomena?.length && phenomena.map((phen) => {
      if (phen['rating_x']['avg'] && phen['rating_y']['avg']) {

        const { innerStroke, outerStroke, fillSymbol } = setNodeColor(phen)
        let node = {}
        node['id'] = phen['id']
        node['color'] = phen['color']
        node['content-type-alias'] = phen['content-type-alias']
        if (phen?.color === 'none') {
          if ((node['content-type-alias'] !== undefined) || node['content-type-alias'] !== 'undefined') {
            // normal nodes
            node['type'] = [].concat({ innerStroke, outerStroke, fillSymbol })
          } else {
             // undefined types
          node['type'] = [].concat({ innerStroke , outerStroke, fillSymbol })
          }
        } 
        else {
          // customer custom types
          node['type'] = [].concat({ innerStroke, outerStroke: 'transparent', fillSymbol: phen.color })
        }
        node['title'] = String(phen['content']['short_title']) || String(phen['content']['title'])
        node['x'] = phen['rating_x']['avg']
        node['y'] = phen['rating_y']['avg']
        node['avg'] = true

        nodes.push(node)
      }
    })
    return nodes
  }, [phenomena])

  function center(event, target) {
    if (event.sourceEvent) {
      const p = d3.pointers(event, target)
      return [d3.mean(p, d => d[0]), d3.mean(p, d => d[1])]
    }
    return [containerWidth / 2, containerHeight / 2]
  }

  const getTextWidth = (text, fontSize = 10, fontFace = 'Roboto') => {
    const canvasAxis = document.getElementById('axis_Conclusion')
    const context = canvasAxis.getContext('2d')
    context.font = fontSize + 'px ' + fontFace
    return context.measureText(text).width
  }

  useEffect(() => {
    if (appContext.axis) {
      axis.width = containerWidth
      axis.height = containerHeight
    }
  }, [appContext.axis])

  useEffect(() => {
    if (!scatterSvg) return
    d3.selectAll('#myNewTextsAvg_Conclusion').style('opacity', visibleText ? 1 : 0)
    d3.selectAll('#myNewTextsMedian_Conclusion').style('opacity', visibleText ? 1 : 0)
    if (isAverage) {
      d3.selectAll('#myNewTextsAvg_Conclusion').style('opacity', visibleText ? 1 : 0)
      d3.selectAll('#myNewTextsMedian_Conclusion').style('opacity', 0)
      d3.selectAll('#circleAvg_Conclusion').style('opacity', 1)
      d3.selectAll('#circleMedian_Conclusion').style('opacity', 0)
    }
    else if (!isAverage) {
      d3.selectAll('#myNewTextsMedian_Conclusion').style('opacity', visibleText ? 1 : 0)
      d3.selectAll('#myNewTextsAvg_Conclusion').style('opacity', 0)
      d3.selectAll('#circleMedian_Conclusion').style('opacity', 1)
      d3.selectAll('#circleAvg_Conclusion').style('opacity', 0)
    }
  }, [scatterSvg, visibleText])

  useEffect(() => {
    if (!scatterSvg) return

    d3.selectAll('#circleAvg_Conclusion').style('opacity', 0)
    d3.selectAll('#circleMedian_Conclusion').style('opacity', 0)
    if (isAverage) {
      d3.selectAll('#myNewTextsAvg_Conclusion').style('opacity', visibleText ? 1 : 0)
      d3.selectAll('#myNewTextsMedian_Conclusion').style('opacity', 0)
      d3.selectAll('#circleAvg_Conclusion').style('opacity', 1)
      d3.selectAll('#circleMedian_Conclusion').style('opacity', 0)
    }
    else if (!isAverage) {
      d3.selectAll('#myNewTextsMedian_Conclusion').style('opacity', visibleText ? 1 : 0)
      d3.selectAll('#myNewTextsAvg_Conclusion').style('opacity', 0)
      d3.selectAll('#circleMedian_Conclusion').style('opacity', 1)
      d3.selectAll('#circleAvg_Conclusion').style('opacity', 0)
    }

  }, [scatterSvg, isAverage])

  useEffect(() => {
    const svg = d3.select('#svg-app_Conclusion').attr("viewBox", [0, 0, containerWidth, containerHeight])

    const canvasAxis = document.getElementById('axis_Conclusion')
    setAppContext({
      axis: canvasAxis,
      axisContext: canvasAxis.getContext('2d'),
      scatterSvg: svg
    })
  }, [containerWidth])

  useEffect(() => {
    
    if (phenomena.length < 1 || !scatterSvg) return
    let nodes = [...nodeListAsAverage, ...nodeListAsMedian]

    let data = nodes.map(item => [item.x, item.y])
    data = [...data, ...Array.from({ length: 50 }, () => [100 * Math.random(), 100 * Math.random()])]

    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d[0]))
      .nice()
      .rangeRound([margin.left, containerWidth - margin.right])
      
    const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d[0]))
      .nice()
      .rangeRound([containerHeight - margin.bottom, margin.top])

    const xAxis = (g, scale) => g
      .attr("transform", `translate(0,${y(0) + 10})`)
      .style('opacity', 0)
      .call(d3.axisBottom(scale).ticks(8))
      .call(g2 => g2.select(".domain").attr("display", "none"))
      .call(g2 => g2.selectAll(".tick line").attr("display", "none"))

    const yAxis = (g, scale) => g
      .attr("transform", `translate(${x(0) - 5},0)`)
      .style('opacity', 0)
      .call(d3.axisLeft(scale).ticks(8))
      .call(g2 => g2.select(".domain").attr("display", "none"))
      .call(g2 => g2.selectAll(".tick line").attr("display", "none"))

    const myWhiteRect = scatterSvg.append('g')
      .selectAll('rect')
      .data(rectNodes)
      .join('rect')
      .attr('fill', 'white')

    const innerText = scatterSvg.append('g')
      .selectAll('text')
      .data(innerTexts)
      .join('text')
      .text(d => d.title)
      .style('fill', 'rgb(224, 222, 222)')
      .style('font-size', '18.2px')
      .style('font-style', 'italic')
      .style('font-weight', '700')
      .style('font-family', 'L10')
      .style('text-align', 'center')

    const innerLine = scatterSvg.append('g')
      .selectAll("line")
      .data(innerLineData)
      .join('line')
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1)

    const gx = scatterSvg.append("g")
    const gy = scatterSvg.append("g")

    const myForeignObjectsAvg = scatterSvg.append('g').selectAll('foreignObject').data(nodeListAsAverage).join('foreignObject')
    myForeignObjectsAvg
      .attr('id', 'myNewTextsAvg_Conclusion')
      .attr('width', maxTextWidth)
      .attr('height', 200)
      .style('transition', 'font-size 0.2s')
      .style('transition-timing-function', 'linear')
      .style('text-align', 'center')
      .append("xhtml:div")
      .html(d => d.title)

    const myForeignObjectsMedian = scatterSvg.append('g').selectAll('foreignObject').data(nodeListAsMedian).join('foreignObject')
      myForeignObjectsMedian
        .attr('id', 'myNewTextsMedian_Conclusion')
        .attr('width', maxTextWidth)
        .attr('height', 200)
        .style('transition', 'font-size 0.2s')
        .style('transition-timing-function', 'linear')
        .style('text-align', 'center')
        .append("xhtml:div")
        .html(d => d.title)

    const myCircleAvg1 = scatterSvg.append('g')
      .selectAll('circle')
      .data(nodeListAsAverage)
      .join('circle')
      .attr('stroke', d => {
        return d.type[0].outerStroke
      })
      .attr('cursor', 'pointer')
      .attr('class', d => {
        return (String(d?.color) === 'none' && (String(d['content-type-alias']) === 'undefined')) ? 'outer_special_circle left' : 'outer_normal_circle left'
      })
      .attr('id', 'circleAvg_Conclusion')
      .style('fill', d => d.type[0].fillSymbol)

    const myCircleAvg = scatterSvg.append('g')
      .selectAll('circle')
      .data(nodeListAsAverage)
      .join('circle')
      .attr('stroke', d => {
        return d.type[0].innerStroke
      })
      .attr('cursor', 'pointer')
      .attr('class', d => {return (String(d?.color) === 'none' && (String(d['content-type-alias']) === 'undefined')) ? 'inner_special_circle left' : 'inner_normal_circle left'})
      .attr('id', 'circleAvg_Conclusion')
      .style('fill', d => {
        if (!!(String(d?.color) === 'none' && (String(d['content-type-alias']) === 'undefined'))) {
          return 'white'
        }

        return d.type[0].fillSymbol
      })
      .attr('cursor', 'pointer')

    const myCircleMedian1 = scatterSvg.append('g')
      .selectAll('circle')
      .data(nodeListAsMedian)
      .join('circle')
      .attr('stroke', d => d.type[0].outerStroke)
      .attr('cursor', 'pointer')
      .attr('id', 'circleMedian_Conclusion')
      .attr('class', d => {
        return (!!(String(d?.color) === 'none' && (String(d['content-type-alias']) === 'undefined'))) ? 'outer_special_circle_median left' : 'outer_normal_circle_median left'
      })
      .style('fill', d => d.type[0].fillSymbol)

    const myCircleMedian = scatterSvg.append('g')
      .selectAll('circle')
      .data(nodeListAsMedian)
      .join('circle')
      .attr('stroke', d => d.type[0].innerStroke)
      .attr('cursor', 'pointer')
      .attr('id', 'circleMedian_Conclusion')
      .attr('class', d => {return (!!(String(d?.color) === 'none' && (String(d['content-type-alias']) === 'undefined'))) ? 'inner_special_circle_median left' : 'inner_normal_circle_median left'})
      .style('fill', d => {
        if (!!(String(d?.color) === 'none' && (String(d['content-type-alias']) === 'undefined'))) {
          return 'white'
        }

        return d.type[0].fillSymbol
      })
      .attr('cursor', 'pointer')

      if (isAverage) {
        d3.selectAll('#myNewTextsAvg_Conclusion').style('opacity', visibleText ? 1 : 0)
        d3.selectAll('#myNewTextsMedian_Conclusion').style('opacity', 0)
        d3.selectAll('#circleAvg_Conclusion').style('opacity', 1)
        d3.selectAll('#circleMedian_Conclusion').style('opacity', 0)
      }
      else if (!isAverage) {
        d3.selectAll('#myNewTextsMedian_Conclusion').style('opacity', visibleText ? 1 : 0)
        d3.selectAll('#myNewTextsAvg_Conclusion').style('opacity', 0)
        d3.selectAll('#circleMedian_Conclusion').style('opacity', 1)
        d3.selectAll('#circleAvg_Conclusion').style('opacity', 0)
      }

    // z holds a copy of the previous transform, so we can track its changes
    let z = d3.zoomIdentity

    // set up the ancillary zooms and an accessor for their transforms
    const zoomX = d3.zoom().scaleExtent([1, 8]).translateExtent([[0, 0], [containerWidth, containerHeight]])
    const zoomY = d3.zoom().scaleExtent([1, 8]).translateExtent([[0, 0], [containerWidth, containerHeight]])
    const tx = () => d3.zoomTransform(gx.node())
    const ty = () => d3.zoomTransform(gy.node())
    gx.call(zoomX).attr("pointer-events", "none")
    gy.call(zoomY).attr("pointer-events", "none")

    const inner_normal_circle = d3.selectAll('.inner_normal_circle')
    const outer_normal_circle = d3.selectAll('.outer_normal_circle')
    const outer_special_circle = d3.selectAll('.outer_special_circle')
    const inner_special_circle = d3.selectAll('.inner_special_circle')
    const outer_normal_circle_median = d3.selectAll('.outer_normal_circle_median')
    const outer_special_circle_median= d3.selectAll('.outer_special_circle_median')
    const inner_normal_circle_median = d3.selectAll('.inner_normal_circle_median')
    const inner_special_circle_median = d3.selectAll('.inner_special_circle_median')
    const myNewTextsAvg_ConclusionID = d3.selectAll('#myNewTextsAvg_Conclusion')
    const myNewTextsMedian_ConclusionID = d3.selectAll('#myNewTextsMedian_Conclusion')

    // active zooming
    const zoom = d3.zoom().scaleExtent([1, 8]).translateExtent([[0, 0], [containerWidth, containerHeight]]).on("zoom", function (e) {
      try {
        const trans = d3.transition().duration(150).ease(d3.easeLinear)
        const t = e.transform
  
        const k = t.k / z.k
        const point = center(e, this)
  
        // is it on an axis? is the shift key pressed?
        // const doX = point[0] > x.range()[0]
        // const doY = point[1] < y.range()[0]
        const shift = e.sourceEvent && e.sourceEvent.shiftKey
  
        if (k === 1) {
          // pure translation?
          gx.call(zoomX.translateBy, (t.x - z.x) / tx().k, 0)
          gy.call(zoomY.translateBy, 0, (t.y - z.y) / ty().k)
        } else {
          // if not, we're zooming on a fixed point
          gx.call(zoomX.scaleBy, shift ? 1 / k : k, point)
          gy.call(zoomY.scaleBy, k, point)
          // doY && gy.call(zoomY.scaleBy, k, point)
        }
  
        z = t
  
        const xr = tx().rescaleX(x)
        const yr = ty().rescaleY(y)
        const radius = myCircleAvg.attr('r')
  
        gx.call(xAxis, xr)
        gy.call(yAxis, yr)
  
        myWhiteRect
          .attr('x', d => xr(d.x))
          .attr('y', d => yr(d.y))
          .attr('width', d => d.width * t.k)
          .attr('height', d => d.height * t.k)
  
        innerText
          .transition(trans)
          .attr('x', d => xr(d.x) - getTextWidth(d.title))
          .attr('y', d => yr(d.y))
  
        innerLine
          .transition(trans)
          .attr("x1", d => xr(d.x1))
          .attr("y1", d => yr(d.y1))
          .attr("x2", d => xr(d.x2))
          .attr("y2", d => yr(d.y2))

        outer_normal_circle
          .transition(trans)
          .on('end', () => {
            try {
              const scale = Math.min(t.k, 8)
              const minScale = Math.max(scale, 1)
              const r = Math.max(NODE_RADIUS, Math.floor(NODE_RADIUS + minScale))
              // const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
              outer_normal_circle
                // .transition(tran2)
                .attr('cx', d => xr(d.x))
                .attr('cy', d => yr(d.y))
                .attr('r', r)
            } catch (error) {
              console.error(error)
            }
          })
          .attr('cx', d => xr(d.x))
          .attr('cy', d => yr(d.y))
          .attr('data-href', d => getPhenomenonUrl(radar?.id, d))

        outer_special_circle
          .transition(trans)
          .on('end', () => {
            try {
              const scale = Math.min(t.k, 8)
              const minScale = Math.max(scale, 1)
              const r = Math.max(SPECIAL_NODE_RADIUS, Math.floor(SPECIAL_NODE_RADIUS + minScale))
              // const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
              outer_special_circle
                // .transition(tran2)
                .attr('cx', d => xr(d.x))
                .attr('cy', d => yr(d.y))
                .attr('r', r)
            } catch (error) {
              console.error(error)
            }
          })
          .attr('cx', d => xr(d.x))
          .attr('cy', d => yr(d.y))
          .attr('data-href', d => getPhenomenonUrl(radar?.id, d))

  
        inner_normal_circle
          .transition(trans)
          .on('end', () => {
            try {
              const scale = Math.min(t.k, 8)
              const minScale = Math.max(scale, 1)
              const r = Math.max(NODE_RADIUS - 3, Math.floor(NODE_RADIUS - 3 + minScale))
              // const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
              inner_normal_circle
                // .transition(tran2)
                .attr('cx', d => xr(d.x))
                .attr('cy', d => yr(d.y))
                .attr('r', r)
            } catch (error) {
              console.error(error)
            }
          })
          .attr('cx', d => xr(d.x))
          .attr('cy', d => yr(d.y))
          .attr('data-href', d => getPhenomenonUrl(radar?.id, d))

        inner_special_circle
          .transition(trans)
          .on('end', () => {
            try {
              const scale = Math.min(t.k, 8)
              const minScale = Math.max(scale, 1)
              const r = Math.max(SPECIAL_NODE_RADIUS - 3, Math.floor(SPECIAL_NODE_RADIUS - 3 + minScale))
              // const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
              inner_special_circle
                // .transition(tran2)
                .attr('cx', d => xr(d.x))
                .attr('cy', d => yr(d.y))
                .attr('r', r)
            } catch (error) {
              console.error(error)
            }
          })
          .attr('cx', d => xr(d.x))
          .attr('cy', d => yr(d.y))
          .attr('data-href', d => getPhenomenonUrl(radar?.id, d))

        outer_normal_circle_median
          .transition(trans)
          .on('end', () => {
            try {
              const scale = Math.min(t.k, 8)
              const minScale = Math.max(scale, 1)
              const r = Math.max(NODE_RADIUS, Math.floor(NODE_RADIUS + minScale))
              // const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
              outer_normal_circle_median
                // .transition(tran2)
                .attr('cx', d => xr(d.x))
                .attr('cy', d => yr(d.y))
                .attr('r', r)
            } catch (error) {
              console.error(error)
            }
          })
          .attr('cx', d => xr(d.x))
          .attr('cy', d => yr(d.y))
          .attr('data-href', d => getPhenomenonUrl(radar?.id, d))

        outer_special_circle_median
          .transition(trans)
          .on('end', () => {
            try {
              const scale = Math.min(t.k, 8)
              const minScale = Math.max(scale, 1)
              const r = Math.max(SPECIAL_NODE_RADIUS, Math.floor(SPECIAL_NODE_RADIUS + minScale))
              // const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
              outer_special_circle_median
                // .transition(tran2)
                .attr('cx', d => xr(d.x))
                .attr('cy', d => yr(d.y))
                .attr('r', r)
            } catch (error) {
              console.error(error)
            }
          })
          .attr('cx', d => xr(d.x))
          .attr('cy', d => yr(d.y))
          .attr('data-href', d => getPhenomenonUrl(radar?.id, d))

        inner_normal_circle_median
          .transition(trans)
          .on('end', () => {
            try {
              const scale = Math.min(t.k, 8)
              const minScale = Math.max(scale, 1)
              const r = Math.max(NODE_RADIUS - 3, Math.floor(NODE_RADIUS - 3 + minScale))
              // const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
              inner_normal_circle_median
                // .transition(tran2)
                .attr('cx', d => xr(d.x))
                .attr('cy', d => yr(d.y))
                .attr('r', r)
            } catch (error) {
              console.error(error)
            }
          })
          .attr('cx', d => xr(d.x))
          .attr('cy', d => yr(d.y))
          .attr('data-href', d => getPhenomenonUrl(radar?.id, d))

        inner_special_circle_median
          .transition(trans)
          .on('end', () => {
            try {
              const scale = Math.min(t.k, 8)
              const minScale = Math.max(scale, 1)
              const r = Math.max(SPECIAL_NODE_RADIUS - 3, Math.floor(SPECIAL_NODE_RADIUS - 3 + minScale))
              // const tran2 = d3.transition().duration(200).ease(d3.easeLinear)
              inner_special_circle_median
                // .transition(tran2)
                .attr('cx', d => xr(d.x))
                .attr('cy', d => yr(d.y))
                .attr('r', r)
            } catch (error) {
              console.error(error)
            }
          })
          .attr('cx', d => xr(d.x))
          .attr('cy', d => yr(d.y))
          .attr('data-href', d => getPhenomenonUrl(radar?.id, d))

        myForeignObjectsAvg
          .transition(trans)
          .on('end', () => {
            try {
              const scale = Math.min(t.k, 8)
              const minScale = Math.max(scale, 1)
              const r = Math.max(10, Math.floor(10 + minScale))
              const fonts = Math.max(10, Math.floor(9 + minScale))
              myNewTextsAvg_ConclusionID.style('font-size', fonts).attr('y', d => yr(d.y) + r / 1 - 3)
            } catch (err) {
              console.log('error', err)
            }
            
          })
          .attr('x', d => {
            return xr(d.x) - maxTextWidth / 2
          })
          .attr('y', d => yr(d.y) + radius / 1)

        myForeignObjectsMedian
          .transition(trans)
          .on('end', () => {
            try {
              const scale = Math.min(t.k, 8)
              const minScale = Math.max(scale, 1)
              const r = Math.max(10, Math.floor(10 + minScale))
              const fonts = Math.max(10, Math.floor(9 + minScale))
              myNewTextsMedian_ConclusionID.style('font-size', fonts).attr('y', d => yr(d.y) + r / 1 - 3)
            } catch (err) {
              console.log('error', err)
            }
          })
          .attr('x', d => {
            return xr(d.x) - maxTextWidth / 2
          })
          .attr('y', d => yr(d.y) + radius / 1)
          
      } catch (error) {
        console.error(error)
      }
    })
    d3.selectAll('circle').on('click', d => onClickNode(d.id))
    scatterSvg.call(zoom)
      .call(zoom.transform, d3.zoomIdentity.scale(1))
      .node()
    return () => {
      scatterSvg.selectAll("*").remove()
    }
  }, [phenomena, scatterSvg, containerHeight, containerWidth])

  const onClickNode = (id) => {
    setVisibleDialog(true)
  }

  const onCloseDialog = () => {
    setVisibleDialog(false)
  }

  const onToggleTitle = (event) => {
    setVisibleText(!visibleText)
  }

  const onToggleIsAverage = (event) => {
    setIsAverage(true)
  }

  const onToggleIsMedian = (event) => {
    setIsAverage(false)
  }

  return (
    <div style={{width: '100%'}}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '56px', paddingRight: '60px'  }}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheckbox_hideTitles_Conclusion" checked={!visibleText} onChange={onToggleTitle} />
              <label className="custom-control-label" for="customCheckbox_hideTitles_Conclusion" style={{fontWeight: 400, fontSize: '13px'}}>{requestTranslation('HideTitles_RadarConclusions')}</label>
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', marginRight: '-12px' }}>
          <p style={{ fontSize: "13px", margin: 0, fontWeight: 400}}>{requestTranslation('ShowResultsAs_RadarConclusions')} </p>
          <div className="custom-control custom-radio custom-control-inline" style={{marginLeft: '16px'}}>
            <input 
              type="radio" 
              id="customRadioInline_AsAverage_Conclusion" 
              name="customRadioInline_AsAverage_Conclusion" 
              className="custom-control-input" 
              checked={isAverage} 
              onChange={onToggleIsAverage} 
            />
              <label className="custom-control-label" for="customRadioInline_AsAverage_Conclusion" style={{fontWeight: 400, fontSize: '13px'}}>{requestTranslation('Average_RadarConclusions')}</label>
          </div>
          <div class="custom-control custom-radio custom-control-inline">
            <input 
              type="radio" 
              id="customRadioInline_AsMedian_Conclusion" 
              name="customRadioInline_AsMedian_Conclusion" 
              className="custom-control-input" 
              checked={!isAverage} 
              onChange={onToggleIsMedian} 
            />
              <label className="custom-control-label" for="customRadioInline_AsMedian_Conclusion" style={{fontWeight: 400, fontSize: '13px'}}>{requestTranslation('Median_RadarConclusions')}</label>
          </div>
        </div>   
    </div>
    <div className='rating-results-diagram' style={{ display: 'flex', paddingTop: '60px', paddingRight: '60px' }}>
      <AxisY originalHeight={containerHeight} axisHeight={containerHeight} axisLabel2={axisLabel2} axisLabel2a={axisLabel2a} axisLabel2b={axisLabel2b} />
      <div style={{
        width: containerWidth,
        height: containerHeight + 70,
        // padding: '0px 0px 60px 0',
        boxSizing: 'content-box',
        // background: '#e0dede' 
      }}>
        <div style={{ position: 'relative', width: containerWidth, height: containerHeight, background: 'white' }}>
          <svg id='svg-app_Conclusion' style={{ position: 'absolute' }} />
          <canvas id='axis_Conclusion' />
        </div>
        <AxisX originalWidth={containerWidth} axisWidth={containerWidth} axisLabel1={axisLabel1} axisLabel1a={axisLabel1a} axisLabel1b={axisLabel1b} />
      </div>
    </div>
  </div>

  )
}

export default App