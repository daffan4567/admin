<?php
require_once('../conf/conf.php');
date_default_timezone_set('Asia/Jakarta');

if (isset($_GET['p'])) {
  //jam reset antrian
  $jamreset = '23:00:00';

  switch ($_GET['p']) {

    case 'pengaturan':
      $_sql = "SELECT nama_instansi, email FROM setting";
      $hasil = bukaquery($_sql);
      $data = array();
      while ($r = mysqli_fetch_array($hasil)) {
        $r['text'] = "Selamat Datang di Rumah Sakit Asysyifaa || RS Asysyifaa :: Melayani dengan hati Kesembuhan datangnya dari Allah SWT || Semoga Lekas Sembuh ";
        $data = $r;
      }
      echo json_encode($data);
      break;

    case 'panggil':
      $_sql = "SELECT a.noantrian, a.loket, a.status FROM antrian_loket a
             WHERE DATE(a.postdate) = CURDATE() AND a.status = '1' AND type = 'Antrian BPJS' LIMIT 1";

      $hasil = bukaquery($_sql);
      $data = array();

      while ($r = mysqli_fetch_array($hasil)) {
        $data[] = $r;
        bukaquery2("UPDATE antrian_loket SET status = '2' 
                    WHERE noantrian = '{$r['noantrian']}' AND DATE(postdate) = CURDATE() AND type = 'Antrian BPJS'");
      }

      echo json_encode($data);
      break;

    case 'panggilumum':
      $_sql = "SELECT a.noantrian, a.loket, a.status FROM antrian_loket a
             WHERE DATE(a.postdate) = CURDATE() AND a.status = '1' AND type = 'Antrian UMUM' LIMIT 1";

      $hasil = bukaquery($_sql);
      $data = array();

      while ($r = mysqli_fetch_array($hasil)) {
        $data[] = $r;
        bukaquery2("UPDATE antrian_loket SET status = '2' 
                    WHERE noantrian = '{$r['noantrian']}' AND DATE(postdate) = CURDATE() AND type = 'Antrian UMUM'");
      }

      echo json_encode($data);
      break;

      case 'nomor':
        $_sql = "SELECT a.noantrian, a.loket
                 FROM antrian_loket a
                 WHERE DATE(a.postdate) = CURDATE() AND a.status = '2' AND a.type= 'Antrian BPJS' ORDER BY noantrian ASC LIMIT 1";
    
        $hasil = bukaquery($_sql);
        $data = array();
    
        if (mysqli_num_rows($hasil) > 0) {
            while ($row = mysqli_fetch_array($hasil)) {
                $row['noantrian'] = str_pad($row['noantrian'], 3, '0', STR_PAD_LEFT); // Format noantrian to 3 digits
                $data[] = $row;
            }
        } else {
            $row = array('noantrian' => '000', 'loket' => '-');
            $data[] = $row;
        }
    
        echo json_encode($data);
        break;
    
    case 'nomorumum':
        $_sql = "SELECT a.noantrian, a.loket
                 FROM antrian_loket a
                 WHERE DATE(a.postdate) = CURDATE() AND a.status = '2' AND a.type ='Antrian UMUM' ORDER BY noantrian ASC LIMIT 1";
    
        $hasil = bukaquery($_sql);
        $data = array();
    
        if (mysqli_num_rows($hasil) > 0) {
            while ($row = mysqli_fetch_array($hasil)) {
                $row['noantrian'] = str_pad($row['noantrian'], 3, '0', STR_PAD_LEFT); // Format noantrian to 3 digits
                $data[] = $row;
            }
        } else {
            $row = array('noantrian' => '000', 'loket' => '-');
            $data[] = $row;
        }
    
        echo json_encode($data);
        break;
    

    // case 'listdipanggil':
    //   $tanggal = date('Y-m-d');
    //   $jam = date('H:i:s');

    //   $data = array();

    //   $_sql = "SELECT a.noantrian, a.loket, a.type
    //              FROM antrian_loket a
    //              WHERE DATE(a.postdate) = CURDATE() AND a.status = '3'
    //              ORDER BY noantrian DESC
    //              LIMIT 5";
    //   $hasil = bukaquery($_sql);

    //   if (mysqli_num_rows($hasil) > 0) {
    //     while ($row = mysqli_fetch_assoc($hasil)) {
    //       // Add prefix based on the type
    //       if ($row['type'] == 'Antrian BPJS') {
    //         $row['noantrian'] = 'A-' . $row['noantrian'];
    //       } elseif ($row['type'] == 'Antrian UMUM') {
    //         $row['noantrian'] = 'B-' . $row['noantrian'];
    //       }
    //       $data[] = $row;
    //     }
    //   } else {
    //     $data[] = array('noantrian' => '-', 'loket' => '-');
    //   }

    //   echo json_encode($data);
    //   break;
  }
}
