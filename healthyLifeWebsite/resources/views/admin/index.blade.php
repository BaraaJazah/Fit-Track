@extends('Layouts.admin')

@section('css')
    <link rel="stylesheet" href="{{ asset('build/assets/css/New_Css/dataTables.bootstrap5.css') }}">
    <link rel="stylesheet" href="build/assets/vendors/jquery-datatables/jquery.dataTables.bootstrap5.min.css">
    <style>
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.4);
            overflow: auto;
        }

        .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 500px;
            border-radius: 8px;
        }

        .close-btn {
            color: #aaa;
            font-size: 32px;
            font-weight: bold;
            text-align: center;
            transform: translateY(-50px);
            color: #fff;
            display: flex;
            justify-content: center
        }

        .close-btn-bg {
            width: 50px;
            height: 50px;
            background-color: #fff;
            border-radius: 50%;
        }

        .close-icon {
            width: 20px;
            height: 20px;
        }

        .close-btn:hover,
        .close-btn:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }

        .open-btn {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .open-btn:hover {
            background-color: #45a049;
        }

        #table1 td,
        #table1 th {
            text-align: center;
            vertical-align: middle;
            /* يخليهم بالنص عامودياً كمان */
        }
    </style>

    <style>
        @keyframes float {
            0% {
                transform: translateY(0px);
            }

            50% {
                transform: translateY(-20px);
            }

            100% {
                transform: translateY(0px);
            }
        }

        .animated {
            animation: float 3s ease-in-out infinite;
        }
    </style>

@endsection

@section('pageName', 'Home')

@section('content')
    <section class="section">
        <div class="col-12 col-lg-12 " style="position: static">
            <div class="row" style="margin-top: 70px">
                <div class="col-6 col-lg-3 col-md-6">
                    <div class="card">
                        <div class="card-body px-3 py-4-5">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="stats-icon blue">
                                        <i class="iconly-boldProfile"></i>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <h6 class="text-muted font-semibold">Total Users</h6>
                                    <h6 class="font-extrabold mb-0">{{ $usersProCount }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-lg-3 col-md-6">
                    <div class="card">
                        <div class="card-body px-3 py-4-5">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="stats-icon purple">
                                        <i class="iconly-boldShow"></i>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <h6 class="text-muted font-semibold">Today Login</h6>
                                    <h6 class="font-extrabold mb-0">{{ $NumLoginUsers }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-6 col-lg-3 col-md-6">
                    <div class="card">
                        <div class="card-body px-3 py-4-5">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="stats-icon green">
                                        <i class="iconly-boldAdd-User"></i>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <h6 class="text-muted font-semibold">Total Earning </h6>
                                    <h6 class="font-extrabold mb-0">{{ $totalEarning }} $</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-lg-3 col-md-6">
                    <div class="card">
                        <div class="card-body px-3 py-4-5">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="stats-icon red">
                                        <i class="iconly-boldBookmark"></i>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <h6 class="text-muted font-semibold">Premium People</h6>
                                    <h6 class="font-extrabold mb-0">{{ $usersProCount }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h4>Profile Visit</h4>
                        </div>
                        <div class="card-body" style="position: relative;">
                            <div id="chart-profile-visit" style="min-height: 315px;">

                                <div id="apexchartsnddobkdn"
                                    class="apexcharts-canvas apexchartsnddobkdn apexcharts-theme-light"
                                    style="width: 641px; height: 300px;">
                                    <svg id="SvgjsSvg1314" width="641" height="300" xmlns="http://www.w3.org/2000/svg"
                                        version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" class="apexcharts-svg"
                                        transform="translate(0, 0)" style="background: transparent;">
                                        <!-- باقي عناصر SVG الثابتة تبقى كما هي -->

                                        <g id="SvgjsG1327" class="apexcharts-bar-series apexcharts-plot-series">
                                            <g id="SvgjsG1328" class="apexcharts-series" rel="1" seriesName="sales"
                                                data:realIndex="0">
                                                @php
                                                    $barWidth = 34.51875;
                                                    $baseHeight = 232.348;
                                                    $maxValue = 30;

                                                    // استخراج القيم والتواريخ من loginCounts
                                                    $values = [];
                                                    foreach ($loginCounts as $entry) {
                                                        $values[] = $entry->count;
                                                    }

                                                    $currentMax = max($values);
                                                @endphp

                                                @foreach ($loginCounts as $index => $entry)
                                                    @php
                                                        $value = $entry->count;
                                                        $label = \Carbon\Carbon::parse($entry->date)->format('M d'); // مثال: "Jul 27"

                                                        // حساب الارتفاع
                                                        $normalizedValue =
                                                            ($value / ($currentMax == 0 ? 1 : $currentMax)) * $maxValue;
                                                        $barHeight = ($normalizedValue / $maxValue) * $baseHeight;
                                                        $yPosition = $baseHeight - $barHeight;

                                                        $xPosition = 7.396875 + $index * 49.3125;
                                                        $xMiddle = $xPosition + $barWidth / 2;
                                                    @endphp

                                                    <!-- شريط البيانات -->
                                                    <path
                                                        d="M {{ $xPosition }} {{ $baseHeight }} L {{ $xPosition }} {{ $yPosition }} L {{ $xPosition + $barWidth }} {{ $yPosition }} L {{ $xPosition + $barWidth }} {{ $yPosition }} L {{ $xPosition + $barWidth }} {{ $baseHeight }} L {{ $xPosition + $barWidth }} {{ $baseHeight }} z"
                                                        fill="rgba(67,94,190,1)" fill-opacity="1"
                                                        class="apexcharts-bar-area" index="{{ $index }}"
                                                        j="{{ $index }}" val="{{ $value }}"
                                                        barHeight="{{ $barHeight }}" barWidth="{{ $barWidth }}"
                                                        pathTo="M {{ $xPosition }} {{ $baseHeight }} L {{ $xPosition }} {{ $yPosition }} L {{ $xPosition + $barWidth }} {{ $yPosition }} L {{ $xPosition + $barWidth }} {{ $yPosition }} L {{ $xPosition + $barWidth }} {{ $baseHeight }} L {{ $xPosition + $barWidth }} {{ $baseHeight }} z"
                                                        pathFrom="M {{ $xPosition }} {{ $baseHeight }} L {{ $xPosition }} {{ $baseHeight }} L {{ $xPosition + $barWidth }} {{ $baseHeight }} L {{ $xPosition + $barWidth }} {{ $baseHeight }} L {{ $xPosition + $barWidth }} {{ $baseHeight }} L {{ $xPosition }} {{ $baseHeight }}"
                                                        cy="{{ $yPosition }}" cx="{{ $xMiddle }}"></path>

                                                    <!-- القيمة (عدد تسجيلات الدخول) فوق العمود -->
                                                    <text font-family="Helvetica, Arial, sans-serif"
                                                        x="{{ $xMiddle }}" y="{{ $yPosition + $barHeight / 2 }}"
                                                        {{-- منتصف ارتفاع العمود --}} text-anchor="middle"
                                                        dominant-baseline="middle" {{-- يجعل النص في الوسط عمودياً --}} font-size="12px"
                                                        font-weight="600" fill="#fff" {{-- لون أبيض واضح على العمود الأزرق --}}
                                                        class="apexcharts-text apexcharts-yaxis-value">
                                                        <tspan>{{ $value }}</tspan>
                                                    </text>
                                                    <!-- التاريخ أسفل العمود -->
                                                    <text font-family="Helvetica, Arial, sans-serif"
                                                        x="{{ $xMiddle }}" y="261.348" text-anchor="middle"
                                                        dominant-baseline="auto" font-size="12px" font-weight="400"
                                                        fill="#373d3f" class="apexcharts-text apexcharts-xaxis-label">
                                                        <tspan>{{ $label }}</tspan>
                                                    </text>
                                                @endforeach
                                            </g>
                                        </g>

                                        <!-- باقي عناصر SVG الثابتة تبقى كما هي -->
                                    </svg>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    </section>

@endsection




@section('error')
    <div class="toast-container" style=" position: fixed; top : 110px ; right : 20px">

        {{--  add success --}}

        @if (Session::has('successfully'))
            <div class="bs-toast toast fade show bg-success screen2" role="alert" aria-live="assertive"
                aria-atomic="true">
                <div class="toast-header" style="background-color: #fff;display: flex;align-items: center">
                    <i class="bi bi-check-circle-fill text-success me-2"></i>
                    <div class="me-auto fw-semibold" style="color: #262626;">successfully</div>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body" style="color: #fff">
                    {{ Session::get('successfully') }}
                </div>
            </div>
        @endif
        {{--  any error --}}
        @if ($errors->any())

            @foreach ($errors->all() as $error)
                <div class="bs-toast toast fade show bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header" style="background-color: #fff;display: flex;align-items: center">
                        <i class="bi bi-exclamation-triangle-fill text-danger me-2"></i>
                        <div class="me-auto fw-semibold" style="color: #262626;">Error : (</div>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body" style="color: #fff ;">
                        {{ $error }}
                    </div>
                </div>
            @endforeach
        @endif

    </div>
@stop



@section('js')
    <script src="{{ asset('build/assets/js/New_JS/jquery-3.7.1.js') }}"></script>
    <script src="{{ asset('build/assets/js/New_JS/dataTables.js') }}"></script>
    <script src="{{ asset('build/assets/js/New_JS/dataTables.bootstrap5.js') }}"></script>

    <script>
        $(document).ready(function() {
            $('#table1').DataTable({
                "order": [
                    [6, 'desc']
                ]
            });
        });

        // إضافة الحدث لكل الأزرار المفتوحة للمودال
        const openModalBtns = document.querySelectorAll('.openModalBtn');

        openModalBtns.forEach((btn) => {
            btn.addEventListener('click', function() {
                // الحصول على المودال الذي سيتم فتحه بناءً على الـ ID
                const modalId = this.getAttribute('data-modal-id');
                const modal = document.getElementById(modalId);
                modal.style.display = "block"; // فتح المودال
            });
        });

        // إغلاق المودال عند الضغط على زر الإغلاق
        const closeBtns = document.querySelectorAll('.close-btn');

        closeBtns.forEach((closeBtn) => {
            closeBtn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                modal.style.display = "none"; // إغلاق المودال
            });
        });

        // إغلاق المودال عند النقر في أي مكان خارج المودال
        window.addEventListener('click', function(event) {
            const modals = document.querySelectorAll('.modal');
            modals.forEach((modal) => {
                if (event.target == modal) {
                    modal.style.display = "none"; // إغلاق المودال
                }
            });
        });
    </script>





@endsection
