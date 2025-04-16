function pengaturan() {
  //=========================================================================
  // Menampilkan data rumah sakit
  $(document).ready(function () {
    $.ajax({
      url: "app/antrian.php?p=pengaturan",
      type: "GET",
      dataType: "json",
      success: function (data) {
        var email = $("#email");
        email.html(data.email);

        var namars = $("#namars");
        namars.html(data.nama_instansi);

        var text = $("#text");
        text.html(data.text);
      },
    });

    // Menginisialisasi Owl Carousel
    $("#informasi-carousel").owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 5000, // 3 seconds
      nav: true,
      dots: true,
    });

    // Menambahkan gambar ke dalam carousel
    var images = [
      // "jadwal.jpg",
      "info1.jpg",
      "info2.jpg",
      "info3.jpg",
      "info4.jpg",
    ];

    images.forEach(function (image) {
      $("#informasi-carousel")
        .trigger("add.owl.carousel", [
          `<div class="item"><img src="informasi/${image}" alt="Informasi" style="margin-left: 27px; width: 450px; height:450px;"></div>`,
        ])
        .trigger("refresh.owl.carousel");
    });
  });

  // Pengaturan video
  const videoPlayer = document.getElementById("myVideo");
  const videos = ["video/1.mp4"];
  let currentVideoIndex = 0;

  function setInitialVideo() {
    videoPlayer.src = videos[currentVideoIndex];
  }

  videoPlayer.addEventListener("ended", () => {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    videoPlayer.src = videos[currentVideoIndex];
    videoPlayer.play();
  });

  videoPlayer.volume = 0;
  videoPlayer.muted = true;
  videoPlayer.poster = "video/poster.jpg";
  setInitialVideo();

  videoPlayer.addEventListener("loadedmetadata", function () {
    if (this.videoHeight > this.videoWidth) {
      this.classList.add("portrait");
    } else {
      this.classList.remove("portrait");
    }
  });
}

$(document).ready(function () {
  pengaturan();
});

// Fungsi untuk memainkan suara bel
function playBellSound() {
  var bellAudio = new Audio("assets/intro.mp3"); // Ganti path dengan lokasi file suara bel Anda
  bellAudio.play();
}

function Suara() {
  $.ajax({
    url: "app/antrian.php?p=panggil",
    type: "GET",
    dataType: "json",
    success: function (data) {
      if (data.length > 0) {
        processQueue(data, 0);
      } else {
        setTimeout(Suara, 3000);
      }
    },
    error: function () {
      setTimeout(Suara, 3000);
    },
  });

  $.ajax({
    url: "app/antrian.php?p=nomor",
    type: "GET",
    dataType: "json",
    success: function (data) {
      var nomorAntrian = $("#nomor");
      nomorAntrian.empty();
      $.each(data, function (index, item) {
        var antrian = $(
          "<p class='card-title' style='margin-left:17%; margin-top: -15%; font-size: 180px; color:black;margin-bottom: 2%'><b>" +
            "A-" +
            item.noantrian +
            "</p></b>" +
            "<p class='card-title' style='margin-left: 17%; margin-top: -5%; font-size: 80px; color:black;'>" +
            "<b>" +
            item.loket +
            "</b>" +
            "</p>"
        );
        nomorAntrian.append(antrian);
      });
    },
  });
}

function processQueue(data, index) {
  if (index >= data.length) {
    setTimeout(Suara, 3000); // Ganti 3000 dengan jeda yang diinginkan
    return;
  }

  var item = data[index];

  playBellSound();

  setTimeout(function () {
    recordVoice(item, function () {
      processQueue(data, index + 1);
    });
  }, 3000); // Sesuaikan jeda antara bel dan suara ke 3 detik
}

function recordVoice(item, callback) {
  var textToSpeak = "";
  if (item.status == "1") {
    textToSpeak =
      "Nomor Antrian " +
      "A" +
      item.noantrian.toLowerCase() +
      ", Silahkan menuju " +
      item.loket.toLowerCase();
  }

  var speech = new SpeechSynthesisUtterance(textToSpeak);
  speech.lang = "id-ID";
  speech.volume = 1; // Atur volume ke 1 (maksimal)
  speech.onend = function () {
    callback();
  };


  window.speechSynthesis.speak(speech);
}

$(document).ready(function () {
  Suara();
  setInterval(Suara, 3000); // Panggil fungsi Suara setiap 3 detik
});

function playBellSound2() {
  var bellAudio = new Audio("assets/intro.mp3"); // Ganti path dengan lokasi file suara bel Anda
  bellAudio.play();
}

function Suara2() {
  $.ajax({
    url: "app/antrian.php?p=panggilumum",
    type: "GET",
    dataType: "json",
    success: function (data) {
      if (data.length > 0) {
        processQueue2(data, 0);
      } else {
        setTimeout(Suara2, 3000);
      }
    },
    error: function () {
      setTimeout(Suara2, 3000);
    },
  });

  $.ajax({
    url: "app/antrian.php?p=nomorumum",
    type: "GET",
    dataType: "json",
    success: function (data) {
      var nomorAntrian = $("#nomorumum");
      nomorAntrian.empty();
      $.each(data, function (index, item) {
        var antrian = $(
          "<p class='card-title' style='margin-left: 17%; margin-top: -15%; font-size: 180px; color:black;margin-bottom: 2%'><b>" +
            "B-" +
            item.noantrian +
            "</p></b>" +
            "<p class='card-title' style='margin-left: 17%; margin-top: -5%; font-size: 80px; color:black; '>" +
            "<b>" +
            item.loket +
            "</b>" +
            "</p>"
        );
        nomorAntrian.append(antrian);
      });
    },
  });
}

function processQueue2(data, index) {
  if (index >= data.length) {
    setTimeout(Suara2, 3000); // Ganti 3000 dengan jeda yang diinginkan
    return;
  }

  var item = data[index];

  playBellSound2();

  setTimeout(function () {
    recordVoice2(item, function () {
      processQueue2(data, index + 1);
    });
  }, 3000); // Sesuaikan jeda antara bel dan suara ke 3 detik
}

function recordVoice2(item, callback) {
  var textToSpeak = "";
  if (item.status == "1") {
    textToSpeak =
      "Nomor Antrian " +
      "B" +
      item.noantrian.toLowerCase() +
      ", Silahkan menuju " +
      item.loket.toLowerCase();
  }

  var speech = new SpeechSynthesisUtterance(textToSpeak);
  speech.lang = "id-ID";
  speech.volume = 1; // Atur volume ke 1 (maksimal)
  speech.onend = function () {
    callback();
  };

  window.speechSynthesis.speak(speech);
}

$(document).ready(function () {
  Suara2();
  setInterval(Suara2, 3000);
});

// $(document).ready(function () {
//   // Inisialisasi Owl Carousel
//   var owl = $("#datapoli").owlCarousel({
//     loop: true,
//     margin: 10,
//     nav: true,
//     autoplay: true,
//     autoplayTimeout: 1000,
//     responsive: {
//       0: {
//         items: 1,
//       },
//       600: {
//         items: 2,
//       },
//       1000: {
//         items: 4,
//       },
//     },
//   });

//   // Fungsi untuk memuat ulang data dan memperbarui carousel
//   function loadData() {
//     $.ajax({
//       url: "app/antrian.php?p=listdipanggil",
//       type: "GET",
//       dataType: "json",
//       success: function (data) {
//         // Kosongkan carousel sebelum memperbarui
//         owl
//           .trigger("replace.owl.carousel", [[]])
//           .trigger("refresh.owl.carousel");

//         // Loop melalui data dan tambahkan slide
//         $.each(data, function (index, item) {
//           var varpoli = $(
//             "<div class='item'>" +
//               "<div class='card pt-2 border border-success text-center'>" +
//               "<h5 style='color: black';>No. Antrian:</h5>" +
//               "<h1 style='color: black';><b>" +
//               item.noantrian +
//               "</b></h1>" +
//               "<h5 style='color: black';><b>" +
//               item.loket +
//               "</b></h5>" +
//               "</div>" +
//               "</div>"
//           );

//           // Tambahkan item ke Owl Carousel
//           owl
//             .trigger("add.owl.carousel", [varpoli])
//             .trigger("refresh.owl.carousel");
//         });
//       },
//       error: function (xhr, status, error) {
//         console.error("Error loading data:", status, error);
//       },
//     });
//   }

//   // Muat data pertama kali saat dokumen siap
//   loadData();

//   // Atur interval untuk memuat ulang data setiap 9 detik
//   setInterval(loadData, 9000);
// });


//=======================================================================
