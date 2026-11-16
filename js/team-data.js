/* =========================================================
   TEAM DATA
   Edit this file to update the team. Each member can carry an
   `img` path. If the image is missing, the site shows an
   initials avatar instead, so nothing breaks while photos
   are being collected.

   Photo convention: team_picture/<Department>_<FirstLast>.png
   The 34 keyed headshots already in team_picture/ are named
   member_01.png ... member_34.png. Point `img` at whichever
   file belongs to each person.
   ========================================================= */

window.TEAM_DATA = {
  leadership: [
    { name: "Astha Chaubey", role: "Lead Organizer", img: "team_picture/Leadership_AsthaChaubey.png", lead: true },
    { name: "Geeth Mehta", role: "Co-Lead Organizer", img: "team_picture/Leadership_GeethMehta.png", lead: true }
  ],

  chiefsOfStaff: [
    { name: "Vyakhya Sharaf", role: "Chief of Staff", img: "team_picture/COS_VyakhyaSharaf.png" },
    { name: "Akshita Joshi", role: "Chief of Staff", img: "team_picture/COS_AkshitaJoshi.png" },
    { name: "Dhwani Kothari", role: "Chief of Staff", img: "team_picture/COS_DhwaniKothari.png" }
  ],

  /* Departments with named chiefs. `placeholders` adds generic member slots. */
  departments: [
    {
      name: "Curation",
      chiefs: [
        { name: "Heer Desai", role: "Co-Chief", img: "team_picture/Curation_HeerDesai.png" },
        { name: "Jiya Shah", role: "Co-Chief", img: "team_picture/Curation_JiyaShah.png" }
      ],
      placeholders: 0
    },
    {
      name: "Finance",
      chiefs: [{ name: "Kushank Siyal", role: "Chief", img: "team_picture/Finance_KushankSiyal.png" }],
      placeholders: 0
    },
    {
      name: "Sponsorship",
      chiefs: [{ name: "Siddhanth Nair", role: "Chief", img: "team_picture/Sponsorship_SiddhanthNair.png" }],
      placeholders: 0
    },
    {
      name: "Legal Affairs",
      chiefs: [
        { name: "Aditya Doshi", role: "Co-Chief", img: "team_picture/Legal_AdityaDoshi.png" },
        { name: "Manasi Mulajkar", role: "Co-Chief", img: "team_picture/Legal_ManasiMulajkar.png" }
      ],
      placeholders: 0
    },
    {
      name: "Decor",
      chiefs: [
        { name: "Rakshaa Rath", role: "Co-Chief", img: "team_picture/Decor_RakshaaRath.png" },
        { name: "Hiya Gupta", role: "Co-Chief", img: "team_picture/Decor_HiyaGupta.png" }
      ],
      placeholders: 0
    },
    {
      name: "Logistics",
      chiefs: [
        { name: "Ishita Joshi", role: "Co-Chief", img: "team_picture/Logistics_IshitaJoshi.png" },
        { name: "Gazal Marda", role: "Co-Chief", img: "team_picture/Logistics_GazalMarda.png" }
      ],
      placeholders: 0
    },
    {
      name: "Hospitality",
      chiefs: [
        { name: "Janya Minocha", role: "Chief", img: "team_picture/Hospitality_JanyaMinocha.png" },
        { name: "Kiara Tavares", role: "Chief", img: "team_picture/Hospitality_KiaraTavares.png" }
      ],
      placeholders: 0
    },
    {
      name: "Technology",
      chiefs: [{ name: "Omprakash Bera", role: "Chief", img: "team_picture/Technology_OmprakashBera.png" }],
      placeholders: 0
    },

    /* Remaining ~60 members spread across these five departments. */
    { name: "Design", chiefs: [], placeholders: 12 },
    { name: "Community Relations", chiefs: [], placeholders: 12 },
    { name: "Content", chiefs: [], placeholders: 12 },
    { name: "Digital Marketing", chiefs: [], placeholders: 12 },
    { name: "Film & Photography", chiefs: [], placeholders: 12 }
  ],

  /* Headshots shown in the scrolling strip above the team grid. */
  marquee: Array.from({ length: 34 }, (_, i) => `team_picture/member_${String(i + 1).padStart(2, "0")}.png`)
};
