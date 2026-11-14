export interface DevotionalItem {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  category: "SAAT_TEDUH" | "PEMURIDAN" | "MISI" | "KARAKTER";
  categoryLabel: string;
  date: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  coverImage: string;
  scriptureRef: string;
  goldenVerse: string;
  scripturePassage: {
    verseNumber: number;
    text: string;
  }[];
  yearlyReading: {
    ot: string;
    nt: string;
  };
  audioDuration: string;
  audioDurationSeconds: number;
  readTime: string;
  excerpt: string;
  reflectionParagraphs: string[];
  reflectionQuestions: string[];
  closingPrayer: string;
  insight: {
    title: string;
    content: string;
    authorSignOff?: string;
  };
  relatedResource?: {
    tag: string;
    title: string;
    description: string;
    image: string;
    href: string;
  };
}

export const DEVOTIONALS_DATA: DevotionalItem[] = [
  {
    id: "dev-today",
    slug: "berinvestasi-dalam-hidup-sesama",
    title: "Berinvestasi dalam Hidup Sesama",
    titleEn: "Investing in the Lives of Others",
    category: "PEMURIDAN",
    categoryLabel: "Pemuridan & Misi",
    date: "14 November 2026",
    author: "Tim Pembina Rohani ESM",
    authorRole: "Staf Pembina Pemuridan",
    authorAvatar: "/uploads/agenda/kegiatan_siswa_camp.jpg",
    coverImage: "/uploads/agenda/kegiatan_misi_lapangan.jpg",
    scriptureRef: "Amsal 13:11-23",
    goldenVerse:
      "Orang baik meninggalkan warisan bagi anak cucunya, tetapi kekayaan orang berdosa disimpan bagi orang benar.",
    scripturePassage: [
      {
        verseNumber: 11,
        text: "Harta yang cepat diperoleh akan berkurang, tetapi siapa mengumpulkan sedikit demi sedikit menjadi kaya.",
      },
      {
        verseNumber: 12,
        text: "Harapan yang tertunda menyedihkan hati, tetapi keinginan yang terpenuhi adalah pohon kehidupan.",
      },
      {
        verseNumber: 13,
        text: "Siapa meremehkan firman akan menanggung akibatnya, tetapi siapa taat pada perintah akan mendapat ganjaran.",
      },
      {
        verseNumber: 14,
        text: "Ajaran orang bijak adalah sumber kehidupan, sehingga orang terhindar dari jerat-jerat maut.",
      },
      {
        verseNumber: 20,
        text: "Siapa bergaul dengan orang bijak menjadi bijak, tetapi sahabat orang bebal menjadi malang.",
      },
      {
        verseNumber: 22,
        text: "Orang baik meninggalkan warisan bagi anak cucunya, tetapi kekayaan orang berdosa disimpan bagi orang benar.",
      },
    ],
    yearlyReading: {
      ot: "Amsal 13-15",
      nt: "Ibrani 10:19-39",
    },
    audioDuration: "04:55",
    audioDurationSeconds: 295,
    readTime: "4 Menit Baca",
    excerpt:
      "Ketika kita meluangkan waktu mendampingi adik binaan atau menabur bagi generasi muda di pelosok, kita sedang menanam warisan kekal yang nilainya melampaui segala harta dunia.",
    reflectionParagraphs: [
      "Ketika seorang dermawan berusia 101 tahun meninggal dunia, tidak seorang pun tahu berapa besar kekayaannya. Semasa hidupnya, ia memilih gaya hidup yang amat sederhana dan menginvestasikan tabungan serta warisan yang dimilikinya untuk riset pengobatan dan pendidikan generasi penerus. Ketika ditanya alasannya, ia tersenyum dan berkata: 'Harta sejati bukanlah apa yang kita kumpulkan di lumbung pribadi, melainkan berapa banyak jiwa yang dimampukan untuk melihat kebaikan Allah.'",
      "Kitab Amsal mengingatkan bahwa jika kita rindu memberi dampak dan menjalani hidup yang benar-benar bermakna, fokus kita tidak boleh hanya terpaku pada kebutuhan diri sendiri. Kita dipanggil memikirkan generasi yang akan datang: 'Orang baik meninggalkan warisan bagi anak cucunya' (Amsal 13:22). Dalam tradisi Alkitab, warisan paling agung bukanlah tumpukan uang atau tanah, melainkan keteladanan iman, integritas hidup, dan firman Tuhan yang tertanam dalam hati generasi berikutnya.",
      "Melalui kelompok kecil pemuridan (KTB) dan pelayanan generasi muda di ESM, kita diberi kehormatan untuk menanam bibit ilahi ini ke dalam kehidupan siswa SMA, mahasiswa di kampus, dan alumni di dunia kerja. Setiap menit yang kita berikan untuk mendengar pergumulan seorang adik binaan, setiap doa yang kita panjatkan untuk sekolah mereka, adalah investasi kekal yang tidak akan pernah layu.",
    ],
    reflectionQuestions: [
      "Bagaimana orang-orang beriman terdahulu (orang tua, kakak mentor, guru rohani) telah berinvestasi dalam kehidupan dan iman Anda?",
      "Ke dalam kehidupan adik atau rekan siapa Tuhan sedang memanggil Anda untuk mulai menabur waktu, doa, dan keteladanan hari ini?",
    ],
    closingPrayer:
      "Tuhan Yesus, terima kasih atas kasih-Mu yang begitu limpah melayani hidupku. Bukalah mataku untuk tidak hidup mementingkan diriku sendiri. Mampukan aku menabur waktu, firman-Mu, dan ketulusan bagi generasi di bawahku, agar nama-Mu dipermuliakan di bumi Nusantara. Amin.",
    insight: {
      title: "Wawasan Teologis & Budaya Kuno",
      content:
        "Dalam tradisi hikmat Ibrani kuno (Chokhmah), kata 'warisan' (nachalah) sering dikaitkan dengan persekutuan perjanjian dengan Yahweh. Mewariskan hikmat kepada anak cucu berarti memastikan bahwa garis keturunan tetap hidup dalam takut akan TUHAN (Yosua 24:15). Salomo menegaskan bahwa harta materi tanpa hikmat akan musnah dalam sekejap, namun manusia yang bertumbuh dalam firman Tuhan akan terus menghasilkan buah yang bertahan sampai kekekalan.",
      authorSignOff: "K.T. Sim – Pengkaji Teologi Biblika",
    },
    relatedResource: {
      tag: "PROYEK MISI & LITERASI",
      title: "Mendistribusikan Modul Saat Teduh ke 1.000 Siswa Pesisir",
      description:
        "Bantu adik-adik binaan di Banten Selatan dan Ternate mendapatkan buku renungan dan modul pembinaan karakter bergambar untuk persekutuan sekolah mereka.",
      image: "/uploads/agenda/kegiatan_misi_lapangan.jpg",
      href: "/kemitraan",
    },
  },
  {
    id: "dev-1",
    slug: "mengapa-keheningan-pagi-menentukan-kemenangan-hari-ini",
    title: "Mengapa Keheningan Pagi Menentukan Kemenangan Hari Ini?",
    titleEn: "Why Morning Silence Determines Today's Spiritual Victory",
    category: "SAAT_TEDUH",
    categoryLabel: "Saat Teduh Harian",
    date: "13 November 2026",
    author: "Tim Pembina Rohani ESM",
    authorRole: "Staf Pembinaan Rohani",
    authorAvatar: "/uploads/agenda/kegiatan_malam_doa.jpg",
    coverImage: "/uploads/agenda/kegiatan_kampus_worship.jpg",
    scriptureRef: "Mazmur 5:4",
    goldenVerse:
      "TUHAN, pada waktu pagi Engkau mendengar seruanku, pada waktu pagi aku mengatur persembahan bagi-Mu, dan aku menunggu-nunggu.",
    scripturePassage: [
      {
        verseNumber: 2,
        text: "Berilah telinga kepada perkataanku, ya TUHAN, indahkanlah keluh kesahku.",
      },
      {
        verseNumber: 3,
        text: "Perhatikanlah seruan maklumanku, ya Rajaku dan Allahku, sebab kepada-Mulah aku berdoa!",
      },
      {
        verseNumber: 4,
        text: "TUHAN, pada waktu pagi Engkau mendengar seruanku, pada waktu pagi aku mengatur persembahan bagi-Mu, dan aku menunggu-nunggu.",
      },
    ],
    yearlyReading: {
      ot: "Mazmur 5-7",
      nt: "Ibrani 9:1-14",
    },
    audioDuration: "03:50",
    audioDurationSeconds: 230,
    readTime: "4 Menit Baca",
    excerpt:
      "Sebelum dunia membanjiri pikiran kita dengan notifikasi media sosial dan kecemasan tugas, luangkan 15 menit pertama untuk mendengar suara Bapa di surga.",
    reflectionParagraphs: [
      "Pertempuran terbesar dalam satu hari sering kali bukan terjadi di tengah kemacetan jalan, di ruang ujian kampus, atau dalam rapat bisnis yang menegangkan. Pertempuran sesungguhnya dimenangkan atau dikalahkan pada 15 menit pertama saat kita membuka mata di pagi hari.",
      "Daud sang pemazmur, di tengah himpitan tanggung jawab kepemimpinan bangsa dan ancaman musuh yang nyata, memiliki sebuah rahasia hidup yang teguh: 'TUHAN, pada waktu pagi Engkau mendengar seruanku... dan aku menunggu-nunggu' (Mazmur 5:4). Daud tidak langsung menyusun strategi militer sebelum ia merendahkan diri dan menyelaraskan hatinya dengan detak jantung Allah.",
      "Saat teduh bukanlah kewajiban ritual legalistik yang menuntut centang harian, melainkan tempat perjumpaan anak yang rindu duduk di pangkuan Bapa. Ketika kita mengawali hari dengan mendengarkan firman-Nya, kita menerima lensa ilahi untuk memandang setiap ujian dan tantangan hari itu dengan ketenangan surgawi.",
    ],
    reflectionQuestions: [
      "Apa hal pertama yang biasanya Anda raih saat membuka mata di pagi hari: notifikasi gawai atau Alkitab dan doa?",
      "Komitmen waktu hening apa yang dapat Anda atur secara disiplin agar suara Bapa mendahului kebisingan dunia?",
    ],
    closingPrayer:
      "Bapa di surga, ampunilah aku bila sering kali membiarkan kecemasan dan notifikasi dunia memenuhi pikiranku terlebih dahulu. Berikanlah aku kerinduan yang haus akan hadirat-Mu di setiap fajar pagi. Bentuklah hatiku hari ini. Dalam nama Yesus, amin.",
    insight: {
      title: "Wawasan Mazmur Daud",
      content:
        "Frasa 'mengatur persembahan' dalam bahasa Ibrani menggunakan akar kata 'arakh', istilah teknis yang sama dengan imam di Kemah Suci ketika mereka menata kayu bakar dan korban di mezbah pada waktu subuh (Imamat 1:7). Daud melihat doa paginya sebagai mezbah pribadi yang dipersiapkan secara sengaja dan teratur bagi Allah.",
    },
    relatedResource: {
      tag: "PANDUAN LATIHAN ROHANI",
      title: "Jurnal Saat Teduh Siswa & Mahasiswa 30 Hari",
      description:
        "Unduh lembar panduan SOAP (Scripture, Observation, Application, Prayer) gratis untuk mendisiplin saat teduh setiap fajar.",
      image: "/uploads/agenda/kegiatan_kampus_retreat.jpg",
      href: "/sumber-daya",
    },
  },
  {
    id: "dev-2",
    slug: "memuridkan-di-tengah-kesibukan-kuliah-dan-tugas-akhir",
    title: "Memuridkan di Tengah Kesibukan Kuliah & Tugas Akhir",
    titleEn: "Discipling Amidst Campus Pressure & Academic Deadlines",
    category: "PEMURIDAN",
    categoryLabel: "Pemuridan Mahasiswa",
    date: "12 November 2026",
    author: "Yohanes Setiawan",
    authorRole: "Koordinator Pelayanan Encounter",
    authorAvatar: "/uploads/pelayanan/encounter_1.jpg",
    coverImage: "/uploads/agenda/kegiatan_kampus_retreat.jpg",
    scriptureRef: "2 Timotius 2:2",
    goldenVerse:
      "Apa yang telah engkau dengar dari padaku di depan banyak saksi, percayakanlah itu kepada orang-orang yang dapat dipercayai, yang cakap juga mengajar orang lain.",
    scripturePassage: [
      {
        verseNumber: 1,
        text: "Sebab itu, hai anakku, jadilah kuat oleh kasih karunia dalam Kristus Yesus.",
      },
      {
        verseNumber: 2,
        text: "Apa yang telah engkau dengar dari padaku di depan banyak saksi, percayakanlah itu kepada orang-orang yang dapat dipercayai, yang cakap juga mengajar orang lain.",
      },
      {
        verseNumber: 3,
        text: "Ikutlah menderita sebagai seorang prajurit yang baik dari Kristus Yesus.",
      },
    ],
    yearlyReading: {
      ot: "Yeremia 29-31",
      nt: "2 Timotius 2",
    },
    audioDuration: "04:15",
    audioDurationSeconds: 255,
    readTime: "5 Menit Baca",
    excerpt:
      "Sering kali kita beralasan menunggu waktu luang untuk mendampingi adik tingkat. Namun murid sejati dibentuk dalam dinamika hidup sehari-hari yang realistis.",
    reflectionParagraphs: [
      "Banyak mahasiswa aktivis rohani terjebak dalam ilusi: 'Saya akan mulai memuridkan adik tingkat nanti saja ketika skripsi saya sudah selesai atau ketika jadwal semester depan lebih longgar.' Namun kenyataannya, kesibukan tidak pernah berkurang; ia hanya bertukar bentuk.",
      "Rasul Paulus menuliskan surat 2 Timotius bukan dari vila peristirahatan yang damai, melainkan dari penjara bawah tanah Roma yang dingin. Di bawah bayang-bayang hukuman mati, prioritas nomor satu Paulus tidak bergeser sedikit pun: 'Percayakanlah itu kepada orang-orang yang dapat dipercayai, yang cakap juga mengajar orang lain' (2 Timotius 2:2).",
      "Pemuridan bukanlah kegiatan tambahan yang ditempelkan di atas agenda mingguan kita; pemuridan adalah gaya hidup mengalir. Saat kita makan siang bersama adik tingkat, saat kita belajar kelompok dan menunjukkan integritas akademik, saat itulah kehidupan Kristus sedang ditularkan.",
    ],
    reflectionQuestions: [
      "Alasan apa yang paling sering menghalangi Anda untuk melipatgandakan hidup bagi orang lain?",
      "Siapakah 1-2 nama adik kampus atau siswa yang dapat Anda ajak bertemu pekan ini untuk sekadar berbagi kabar dan berdoa bersama?",
    ],
    closingPrayer:
      "Tuhan, ampuni aku jika terlalu mencintai kenyamanan dan jadwal pribadiku. Jadikanlah hidupku saluran berkat dan pembuat murid, agar kelak aku tidak berdiri dengan tangan hampa di hadapan-Mu. Amin.",
    insight: {
      title: "Prinsip Multiplikasi 4 Generasi",
      content:
        "Dalam 2 Timotius 2:2 terdapat empat generasi rohani: (1) Paulus, (2) Timotius, (3) Orang-orang yang dapat dipercayai, dan (4) Orang lain yang akan mereka ajar. Visi Alkitabiah bukanlah penambahan (adisi), melainkan pelipatgandaan eksponensial (multiplikasi) dari generasi ke generasi.",
    },
    relatedResource: {
      tag: "MODUL PEMBINAAN KAMPUS",
      title: "Bahan PA Mahasiswa: Menemukan Worldview Kristiani",
      description:
        "Bahan panduan 12 bab untuk memimpin kelompok kecil KTB Encounter di universitas negeri maupun swasta.",
      image: "/uploads/agenda/kegiatan_kampus_worship.jpg",
      href: "/sumber-daya",
    },
  },
  {
    id: "dev-3",
    slug: "mata-yang-terarah-pada-ladang-yang-menguning-di-banten-dan-ternate",
    title: "Mata yang Terarah Pada Ladang yang Menguning di Banten & Ternate",
    titleEn: "Eyes Focused on the Ripe Harvest Fields in Banten & Ternate",
    category: "MISI",
    categoryLabel: "Warta Misi Lapangan",
    date: "10 November 2026",
    author: "Staf Misi Lapangan ESM",
    authorRole: "Koordinator Perintisan Pos Pelayanan",
    authorAvatar: "/uploads/agenda/kegiatan_misi_lapangan.jpg",
    coverImage: "/uploads/agenda/kegiatan_misi_lapangan.jpg",
    scriptureRef: "Yohanes 4:35",
    goldenVerse:
      "Lihatlah sekelilingmu dan pandanglah ladang-ladang yang sudah menguning dan matang untuk dituai!",
    scripturePassage: [
      {
        verseNumber: 34,
        text: "Kata Yesus kepada mereka: 'Makanan-Ku ialah melakukan kehendak Dia yang mengutus Aku dan menyelesaikan pekerjaan-Nya.'",
      },
      {
        verseNumber: 35,
        text: "Bukankah kamu mengatakan: Empat bulan lagi barulah tiba musim menuai? Tetapi Aku berkata kepadamu: Lihatlah sekelilingmu dan pandanglah ladang-ladang yang sudah menguning dan matang untuk dituai!",
      },
      {
        verseNumber: 36,
        text: "Sekarang juga penuai telah menerima upahnya dan ia mengumpulkan buah untuk hidup yang kekal, sehingga penabur dan penuai sama-sama bersukacita.",
      },
    ],
    yearlyReading: {
      ot: "Yesaya 52-54",
      nt: "Yohanes 4:27-54",
    },
    audioDuration: "04:40",
    audioDurationSeconds: 280,
    readTime: "4 Menit Baca",
    excerpt:
      "Ketika Yesus memandang orang banyak, hati-Nya tergerak oleh belas kasihan. Apakah kita masih memiliki hati yang berdenyut bagi jiwa-jiwa yang belum terjangkau?",
    reflectionParagraphs: [
      "Para murid Yesus mengira pelayanan baru bisa dimulai nanti ketika kondisi sudah ideal atau musim panen sudah tiba. Namun Yesus menegur kelambatan rohani mereka dengan pandangan yang tajam: 'Lihatlah sekelilingmu dan pandanglah ladang-ladang yang sudah menguning!' (Yohanes 4:35).",
      "Di pos-pos rintisan ESM di pesisir Banten Selatan dan pedalaman pulau-pulau Maluku Utara, puluhan anak dan remaja sekolah menempuh jalan berkilo-kilometer dengan harapan memperoleh pembinaan karakter dan bimbingan rohani yang tulus. Ladang-ladang itu telah matang, menunggu para pekerja yang rela diutus.",
      "Keterlibatan dalam misi bukanlah monopoli misionaris penuh waktu; setiap pendoa syafaat, setiap pendonor modul renungan, dan setiap profesional yang berbagi keahlian adalah bagian dari satu kesatuan penuai Allah.",
    ],
    reflectionQuestions: [
      "Apakah doa-doa Anda selama ini hanya berputar pada berkat pribadi, atau sudah mencakup perluasan kerajaan Allah di daerah terluar?",
      "Langkah konkrit apa yang dapat Anda ambil untuk menopang satu pos pelayanan rintisan bulan ini?",
    ],
    closingPrayer:
      "Tuhan yang empunya tuaian, utuslah pekerja-pekerja setia ke ladang-Mu. Bukalah mataku agar tidak menutup telinga terhadap jeritan generasi yang haus akan kebenaran-Mu. Pakailah hidupku dan persembahanku bagi kemuliaan nama-Mu. Amin.",
    insight: {
      title: "Konteks Samaria",
      content:
        "Yesus mengucapkan perkataan ini tepat saat penduduk kota Sikhar (orang Samaria yang dipandang rendah oleh kaum Yahudi ortodoks) sedang berbondong-bondong berjalan mendekati-Nya dengan jubah putih mereka yang berkibar di bawah terik matahari, tampak seperti ladang gandum yang menguning siap dituai.",
    },
    relatedResource: {
      tag: "KEMITRAAN MISI",
      title: "Adopsi Pos Binaan Pelajar Pesisir Ternate",
      description:
        "Bergabung menjadi orang tua asuh modul pembinaan dan guru pendamping bagi pos binaan di Maluku Utara.",
      image: "/uploads/agenda/kegiatan_siswa_camp.jpg",
      href: "/kemitraan",
    },
  },
  {
    id: "dev-4",
    slug: "integritas-pelajar-bersaksi-lewat-kejujuran-di-ruang-ujian",
    title: "Integritas Pelajar: Bersaksi Lewat Kejujuran di Ruang Ujian",
    titleEn: "Student Integrity: Bearing Witness Through Honesty in Exam Rooms",
    category: "KARAKTER",
    categoryLabel: "Karakter Pelajar",
    date: "08 November 2026",
    author: "Pembina Explore Siswa",
    authorRole: "Staf Pembina Siswa SMA",
    authorAvatar: "/uploads/pelayanan/explore_hero.jpg",
    coverImage: "/uploads/pelayanan/explore_hero.jpg",
    scriptureRef: "Amsal 11:3",
    goldenVerse:
      "Orang yang tulus dipimpin oleh ketulusannya, tetapi pengkhianat dirusak oleh kelicikannya.",
    scripturePassage: [
      {
        verseNumber: 1,
        text: "Neraca serong adalah kekejian bagi TUHAN, tetapi Ia berkenan kepada batu timbangan yang tepat.",
      },
      {
        verseNumber: 2,
        text: "Jikalau keangkuhan tiba, tiba juga cemooh, tetapi hikmat ada pada orang yang rendah hati.",
      },
      {
        verseNumber: 3,
        text: "Orang yang tulus dipimpin oleh ketulusannya, tetapi pengkhianat dirusak oleh kelicikannya.",
      },
    ],
    yearlyReading: {
      ot: "Amsal 11-12",
      nt: "Titus 2",
    },
    audioDuration: "03:45",
    audioDurationSeconds: 225,
    readTime: "3 Menit Baca",
    excerpt:
      "Kekristenan bukan hanya lagu di hari Minggu, melainkan ujian integritas saat pensil menulis jawaban tanpa menyontek di hadapan Tuhan yang melihat segalanya.",
    reflectionParagraphs: [
      "Di era ketika kunci jawaban beredar luas di grup obrolan ponsel dan jalan pintas dianggap sebagai kecerdikan, berkata 'tidak' terhadap kecurangan adalah tindakan revolusioner iman bagi seorang siswa SMA.",
      "Amsal 11:3 mengingatkan bahwa integritas pribadi bukanlah sekadar menjaga reputasi di mata guru, melainkan sebuah kompas batin di hadapan Allah yang mahatahu: 'Orang yang tulus dipimpin oleh ketulusannya.' Nilai rapor yang diraih dengan kejujuran, walau mungkin tidak sempurna, memiliki bobot kehormatan di mata Tuhan.",
      "Tuhan tidak pernah menuntut kita menjadi yang paling pintar di kelas, namun Ia memanggil setiap murid-Nya untuk menjadi yang paling terpercaya dalam kejujuran.",
    ],
    reflectionQuestions: [
      "Kapan terakhir kali Anda tergoda berkompromi dengan kejujuran di sekolah atau tempat kerja?",
      "Bagaimana keberanian Anda mempertahankan integritas dapat menjadi kesaksian nyata bagi teman-teman sebaya?",
    ],
    closingPrayer:
      "Ya Bapa yang adil dan benar, kuatkanlah hatiku agar tidak gentar berdiri sendiri demi kebenaran. Tolong aku menghargai kejujuran di atas nilai angka dan pujian manusia. Biarlah seluruh tindakanku memuliakan Kristus. Amin.",
    insight: {
      title: "Neraca Serong",
      content:
        "Pada zaman kuno di pasar Timur Dekat, pedagang nakal sering menggunakan dua set batu timbangan: satu lebih berat saat membeli barang dan satu lebih ringan saat menjual. Alkitab menegaskan bahwa integritas dalam hal-hal kecil sehari-hari adalah cerminan langsung dari pengenalan kita akan kekudusan Allah.",
    },
    relatedResource: {
      tag: "KOMUNITAS SISWA EXPLORE",
      title: "Temukan Sahabat Sebaya Berakar Iman di Kotamu",
      description:
        "Bergabunglah dalam kelompok persekutuan siswa SMA Explore untuk saling menguatkan integritas dan pertumbuhan firman.",
      image: "/uploads/pelayanan/explore_hero.jpg",
      href: "/pelayanan/explore",
    },
  },
  {
    id: "dev-5",
    slug: "menemukan-ketenteraman-batin-di-tengah-kecemasan-masa-depan",
    title: "Menemukan Ketenteraman Batin di Tengah Kecemasan Masa Depan",
    titleEn: "Finding Inner Serenity Amidst Future Career Anxiety",
    category: "SAAT_TEDUH",
    categoryLabel: "Ketenangan Batin",
    date: "05 November 2026",
    author: "Staf Konseling Mahasiswa",
    authorRole: "Konselor Pastoral ESM",
    authorAvatar: "/uploads/agenda/kegiatan_alumni_forum.jpg",
    coverImage: "/uploads/pelayanan/connect_1.jpg",
    scriptureRef: "Filipi 4:6-7",
    goldenVerse:
      "Janganlah hendaknya kamu kuatir tentang apa pun juga, tetapi nyatakanlah dalam segala hal keinginanmu kepada Allah dalam doa dan permohonan dengan ucapan syukur.",
    scripturePassage: [
      {
        verseNumber: 4,
        text: "Bersukacitalah senantiasa dalam Tuhan! Sekali lagi kukatakan: Bersukacitalah!",
      },
      {
        verseNumber: 6,
        text: "Janganlah hendaknya kamu kuatir tentang apa pun juga, tetapi nyatakanlah dalam segala hal keinginanmu kepada Allah dalam doa dan permohonan dengan ucapan syukur.",
      },
      {
        verseNumber: 7,
        text: "Damai sejahtera Allah, yang melampaui segala akal, akan memelihara hati dan pikiranmu dalam Kristus Yesus.",
      },
    ],
    yearlyReading: {
      ot: "Mazmur 23 & 91",
      nt: "Filipi 4",
    },
    audioDuration: "04:30",
    audioDurationSeconds: 270,
    readTime: "5 Menit Baca",
    excerpt:
      "Kecemasan adalah sinyal agar kita mengalihkan beban kepada Tuhan lewat doa dan ucapan syukur. Damai sejahtera Allah yang melampaui segala akal akan memelihara hatimu.",
    reflectionParagraphs: [
      "Masa transisi kuliah ke dunia kerja sering kali dibayangi oleh ketidakpastian: 'Apakah saya akan mendapatkan pekerjaan?', 'Apakah penghasilan saya cukup?', 'Bagaimana jika saya tertinggal dari teman-teman yang sudah sukses?'",
      "Kekhawatiran bukanlah dosa yang harus disangkali, melainkan alarm batin yang mengarahkan kita untuk berlutut. Rasul Paulus tidak berkata 'jangan punya masalah', melainkan ia memberikan resep penawarnya: 'Nyatakanlah dalam segala hal keinginanmu kepada Allah... dengan ucapan syukur' (Filipi 4:6).",
      "Damai sejahtera Allah ('shalom') bukanlah ketiadaan badai, melainkan ketenteraman yang tidak logis di tengah badai karena kita tahu siapa nahkoda kapal kehidupan kita.",
    ],
    reflectionQuestions: [
      "Beban masa depan apa yang paling membebani pundak Anda minggu ini?",
      "Sebutkan tiga hal konkrit pemeliharaan Tuhan di masa lalu yang dapat Anda syukuri hari ini sebelum meminta hal yang baru?",
    ],
    closingPrayer:
      "Tuhan Yesus, ke dalam tangan-Mu aku meletakkan seluruh masa depanku, cita-citaku, dan ketakutanku. Biarlah damai sejahtera-Mu yang melampaui segala akal menjaga hati dan pikiranku agar tetap tenang di dalam-Mu. Amin.",
    insight: {
      title: "Garnisun Penjaga Hati",
      content:
        "Kata 'memelihara' dalam Filipi 4:7 dalam bahasa Yunani adalah 'phroureo', sebuah istilah militer yang berarti sepasukan tentara garnisun yang berdiri berjaga-jaga di gerbang benteng kota. Damai Allah bertindak sebagai prajurit penjaga yang mencegah kekhawatiran dan keputusasaan menerobos benteng batin orang percaya.",
    },
    relatedResource: {
      tag: "KOMUNITAS CONNECT",
      title: "Forum Mentoring Alumni & Profesional Muda",
      description:
        "Dapatkan bimbingan karir berlandaskan iman dari para profesional senior dan alumni ESM yang berpengalaman.",
      image: "/uploads/pelayanan/connect_1.jpg",
      href: "/pelayanan/connect",
    },
  },
];
