function pengaturan() {
  //=========================================================================

  // Pengaturan video
  const videoPlayer = document.getElementById("myVideo");
  const videos = ["video/cp.mp4", "video/jkn.mp4", "video/antar.mp4"]; // Tambahkan video lain
  // const videos = ["video/cp.mp4", "video/jkn.mp4"]; // Tambahkan video lain
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

function Suara() {
  $.ajax({
    url: "app/antrian.php?p=panggil",
    type: "GET",
    dataType: "json",
    success: function (data) {
      var nomorAntrian = $("#suara");
      nomorAntrian.empty();

      $.each(data, function (index, item) {
        // Memainkan suara intro sebelum antrian
        var audioIntro = new Audio("assets/intro.mp3");
        
        audioIntro.onended = function () {
          var audioNotif = new Audio("assets/suara/antrian_a.mp3");
          
          audioNotif.onended = function () {
            // Memainkan suara nomor antrian
            var audioAntrian = new Audio("assets/suara/noantrian_" + item.noantrian + ".mp3");
            audioAntrian.onended = function () {
              // Memainkan suara loket berdasarkan nomor loket
              var loketAudioFile = "assets/suara/loket_" + item.loket.split(" ")[1] + ".mp3";
              var audioLoket = new Audio(loketAudioFile);
              audioLoket.play();
            };
            audioAntrian.play();
          };
          audioNotif.play();
        };
        audioIntro.play();
      });
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
          "<p class='card-title' style='margin-left:2%; margin-top: -5%; font-size: 140px; color:black;margin-bottom: 2%'><b>" +
            "A-" +
            item.noantrian +
            "</p></b>" +
            "<p class='card-title' style='margin-left: 12%; margin-top: -5%; font-size: 80px; color:black;'>" +
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
//refresh otomatis setiap 5 detik
setInterval(Suara, 250);
$(document).ready(function () {
  Suara();
});

function Suara2() {
  $.ajax({
    url: "app/antrian.php?p=panggilumum",
    type: "GET",
    dataType: "json",
    success: function (data) {
      var nomorAntrian = $("#suaraumum");
      nomorAntrian.empty();

      $.each(data, function (index, item) {
        // Memainkan suara intro sebelum antrian
        var audioIntro = new Audio("assets/intro.mp3");
        
        audioIntro.onended = function () {
          var audioNotif = new Audio("assets/suara/antrian_b.mp3");
          
          audioNotif.onended = function () {
            // Memainkan suara nomor antrian
            var audioAntrian = new Audio("assets/suara/noantrian_" + item.noantrian + ".mp3");
            audioAntrian.onended = function () {
              // Memainkan suara loket berdasarkan nomor loket
              var loketAudioFile = "assets/suara/loket_" + item.loket.split(" ")[1] + ".mp3";
              var audioLoket = new Audio(loketAudioFile);
              audioLoket.play();
            };
            audioAntrian.play();
          };
          audioNotif.play();
        };
        audioIntro.play();
      });
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
          "<p class='card-title' style='margin-left:2%; margin-top: -5%; font-size: 140px; color:black;margin-bottom: 2%'><b>" +
            "B-" +
            item.noantrian +
            "</p></b>" +
            "<p class='card-title' style='margin-left: 10%; margin-top: -5%; font-size: 80px; color:black;'>" +
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
//refresh otomatis setiap 5 detik
setInterval(Suara2, 250);
$(document).ready(function () {
  Suara2();
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
