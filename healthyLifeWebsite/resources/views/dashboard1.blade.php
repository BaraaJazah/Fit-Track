{{-- <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daily Calories App</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />

    <style>
        body {
            background: #252E3D;
            font-family: Arial, sans-serif;
            color: #fff;
        }

        .container-custom {
            max-width: 90%;
            margin: auto;
            text-align: center;
            padding: 50px 0;
        }

        .app-logo {
            width: 120px;
            height: 120px;
            border-radius: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            margin-bottom: 20px;
        }

        p {
            color: #d1d5db;
        }

        /* Swiper */
        .swiper {
            width: 100%;
            padding-top: 40px;
            padding-bottom: 40px;
        }

        .swiper-slide {
            width: 500px;
            height: 700px;
            transition: transform 0.3s, opacity 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.5;
        }

        .swiper-slide img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            /* يظهر كامل الصورة */
            border-radius: 15px;
            /* box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4); */
        }

        .swiper-slide-active {
            transform: scale(1.2);
            opacity: 1;
            z-index: 2;
        }

        .download-btn img {
            height: 50px;
        }
    </style>
</head>

<body>

    <div class="container container-custom">
        <img src="{{ asset('build/assets/images/logo/logo.png') }}" alt="App Logo" class="app-logo">
        <h1 class="fw-bold">Daily Calories App</h1>
        <p>An app that helps you track your daily calorie intake easily.</p>

        <!-- Download Buttons -->
        <div class="d-flex justify-content-center gap-3 my-4">
            <a href="https://apps.apple.com/" target="_blank" class="download-btn">
                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on App Store">
            </a>
            <a href="https://play.google.com/store" target="_blank" class="download-btn">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play">
            </a>
        </div>

        <!-- Swiper Carousel -->
        <div class="swiper mySwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="{{ asset('build/assets/images/appImages/1.jpg') }}" alt="1">
                </div>
                <div class="swiper-slide"><img src="{{ asset('build/assets/images/appImages/2.jpg') }}" alt="2">
                </div>
                <div class="swiper-slide"><img src="{{ asset('build/assets/images/appImages/3.jpg') }}" alt="3">
                </div>
                <div class="swiper-slide"><img src="{{ asset('build/assets/images/appImages/4.jpg') }}" alt="4">
                </div>
                <div class="swiper-slide"><img src="{{ asset('build/assets/images/appImages/5.jpg') }}" alt="5">
                </div>
                <div class="swiper-slide"><img src="{{ asset('build/assets/images/appImages/6.jpg') }}" alt="6">
                </div>
            </div>
            <!-- Navigation -->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
    </div>

    <!-- Swiper JS -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
    <script>
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 3,
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 3000, // كل 2 ثانية يتحرك
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    </script>

</body>

</html> --}}
