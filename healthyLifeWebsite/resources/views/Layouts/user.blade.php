<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('pageName')</title>

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="build/assets/css/bootstrap.css">
    <link rel="stylesheet" href="build/assets/vendors/iconly/bold.css">
    <link rel="stylesheet" href="build/assets/vendors/perfect-scrollbar/perfect-scrollbar.css">
    <link rel="stylesheet" href="build/assets/vendors/bootstrap-icons/bootstrap-icons.css">
    <link rel="stylesheet" href="build/assets/css/app.css">
    <link rel="shortcut icon" href="build/assets/images/favicon.svg" type="image/x-icon">

    <style>
        .baraa-header {
            background-color: #fff;
            height: 8vh;
            width: 100%;
            display: flex;
            transform: translateY(-20px);
            align-items: center;
            padding: 40px;
            border-radius: 24px;
            justify-content: space-between
        }

        .dropdown-menu {
            z-index: 9999 !important;
            position: absolute !important;
        }
    </style>

    @section('css')
    @show
</head>

<body>
    <div id="app">
        <div id="sidebar" class="active">
            <div class="sidebar-wrapper active">
                <div class="sidebar-header d-flex  justify-content-center ">
                    <div class="logo">
                        <a href="{{ route('user.Index') }}"><img style="width: 120px ; height: 120px;"
                                src="build/assets/images/logo/logo.png" alt="Logo" srcset=""></a>
                    </div>

                </div>
                <div class="sidebar-menu">
                    <ul class="menu">
                        <li class="sidebar-title">Menu</li>

                        <li class="sidebar-item  {{ request()->routeIs('user.Index') ? 'active' : '' }}">
                            <a href="{{ route('user.Index') }}" class='sidebar-link'>
                                <i class="bi bi-house-fill"></i>
                                <span>Home</span>
                            </a>
                        </li>

                        <li class="sidebar-item  {{ request()->routeIs('user.works') ? 'active' : '' }}">
                            <a href="{{ route('user.works') }}" class='sidebar-link'>
                                <i class="bi bi-grid-fill"></i>
                                <span>Works</span>
                            </a>
                        </li>

                        {{-- <li class="sidebar-item  has-sub">
                            <a href="#" class='sidebar-link'>
                                <i class="bi bi-stack"></i>
                                <span>Works</span>
                            </a>
                            <ul class="submenu  ">
                                <li class="submenu-item  ">
                                    <a href="{{ route('admin.open') }}">Open</a>
                                </li>
                                <li class="submenu-item ">
                                    <a href="{{ route('admin.continue') }}">Continue</a>
                                </li>
                                <li class="submenu-item ">
                                    <a href="{{ route('admin.wait') }}">Wait</a>
                                </li>

                                <li class="submenu-item ">
                                    <a href="{{ route('admin.finish') }}">Finish</a>
                                </li>
                            </ul>
                        </li> --}}


                    </ul>
                </div>
                <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
            </div>
        </div>

        <div id="main">

            <header class="mb-3">
                <div class="baraa-header">
                    <a href="#" class="burger-btn d-block d-xl-none" style="padding-right:20px; ">
                        <i style="display: flex;align-items: center;justify-content: center;"
                            class="bi bi-justify fs-3"></i>
                    </a>
                    <div></div>

                    <div class="nav-item dropdown">
                        <a class="nav-link pe-0 ps-2" id="navbarDropdownUser" role="button" data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <div class="avatar avatar-xl">
                                <img class="rounded-circle" src="{{ asset('build/assets/images/faces/1.jpg') }}"
                                    alt="">
                            </div>
                        </a>
                        <div class="dropdown-menu dropdown-caret dropdown-menu-end py-1"
                            style="background-color: #fff; border-radius: 10px;" aria-labelledby="navbarDropdownUser">

                            <a class="dropdown-item" style="color: #999 ;display: flex;align-items: center"
                                href="#">
                                <i class="bi bi-person-fill me-2"></i>
                                <span> Profile</span>

                            </a>

                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <button class="dropdown-item" style="color: #999; display: flex;align-items: center"
                                    type="submit">
                                    <i class="bi bi-power me-2"></i>
                                    <span> Logout</span>
                                </button>
                            </form>

                        </div>
                    </div>

                </div>

            </header>


            <div class="page-content" style="margin-top:50px">


                @section('content')
                @show

                @section('error')
                @show
            </div>

            @section('footer')
            @show

        </div>
    </div>


    <script src="{{ asset('build/assets/js/New_JS/bootstrap.bundle.min.js') }}"></script>
    <script src="build/assets/vendors/perfect-scrollbar/perfect-scrollbar.min.js"></script>

    <script src="build/assets/js/mazer.js"></script>



    @section('js')
    @show
</body>





</html>
