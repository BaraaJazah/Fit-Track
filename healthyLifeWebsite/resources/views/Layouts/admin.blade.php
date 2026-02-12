<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('pageName')</title>

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('build/assets/css/bootstrap.css') }}">
    <link rel="stylesheet" href="{{ asset('build/assets/vendors/iconly/bold.css') }}">
    <link rel="stylesheet" href="{{ asset('build/assets/vendors/perfect-scrollbar/perfect-scrollbar.css') }}">
    <link rel="stylesheet" href="{{ asset('build/assets/vendors/bootstrap-icons/bootstrap-icons.css') }}">
    <link rel="stylesheet" href="{{ asset('build/assets/css/app.css') }}">
    <link rel="shortcut icon" href="{{ asset('build/assets/images/favicon.svg') }}" type="image/x-icon">

    <style>
        .baraa-header {
            background-color: #fff;
            height: 8vh;
            width: 100%;
            display: flex;
            transform: translateY(-20px);
            align-items: center;
            padding: 20px;
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
                        <a href="{{ route('dashboard') }}"><img style="width: 120px ; height: 120px;"
                                src="{{ asset('build/assets/images/logo/logo.png') }}" alt="Logo"
                                srcset=""></a>
                    </div>
                    <div class="toggler" style="transform: translateX(50px)">
                        <a href="#" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
                    </div>

                </div>
                <div class="sidebar-menu">
                    <ul class="menu">
                        <li class="sidebar-title">Menu</li>

                        <li class="sidebar-item {{ request()->routeIs('dashboard') ? 'active' : '' }}">
                            <a href="{{ route('dashboard') }}" class='sidebar-link'>
                                <i class="bi bi-house-fill"></i>
                                <span>Home</span>
                            </a>
                        </li>
                        <li
                            class="sidebar-item  has-sub  {{ request()->routeIs('admin.allUsers') | request()->routeIs('admin.loginUser') | request()->routeIs('admin.editUserData') ? 'active' : '' }}">
                            <a href="#" class='sidebar-link'>
                                <i class="bi bi-stack"></i>
                                <span>Users</span>
                            </a>
                            <ul class="submenu">
                                <li
                                    class="submenu-item  {{ request()->routeIs('admin.allUsers') | request()->routeIs('admin.editUserData') ? 'active' : '' }} ">
                                    <a href="{{ route('admin.allUsers') }}">All Users</a>
                                </li>
                                <li class="submenu-item  {{ request()->routeIs('admin.loginUser') ? 'active' : '' }} ">
                                    <a href="{{ route('admin.loginUser') }}">login User</a>
                                </li>

                            </ul>
                        </li>
                        <li
                            class="sidebar-item  has-sub {{ request()->routeIs('admin.comment') |
                            request()->routeIs('admin.group') |
                            request()->routeIs('admin.subgroup') |
                            request()->routeIs('admin.subgroup')
                                ? 'active'
                                : '' }}">
                            <a href="#" class='sidebar-link'>
                                <i class="bi bi-stack"></i>
                                <span>From Users</span>
                            </a>
                            <ul class="submenu">
                                <li class="submenu-item {{ request()->routeIs('admin.comment') ? 'active' : '' }} ">
                                    <a href="{{ route('admin.comment') }}">Comments</a>
                                </li>
                            </ul>
                        </li>

                        <li class="sidebar-item {{ request()->routeIs('admin.supportPage') ? 'active' : '' }}">
                            <a href="{{ route('admin.supportPage') }}" class='sidebar-link'>
                                <i class="bi bi-headset"></i>
                                <span>Support</span>
                            </a>
                        </li>

                    </ul>
                </div>
                <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
            </div>
        </div>

        <div id="main">

            <header class="mb-3">
                <div class="baraa-header">
                    <a href="#" class="burger-btn d-block d-xl-none" style="padding-right:20px;">
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


            <div class="page-content" style="margin-top:10px">


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
    <script src="{{ asset('build/assets/vendors/perfect-scrollbar/perfect-scrollbar.min.js') }}"></script>

    <script src="{{ asset('build/assets/js/mazer.js') }}"></script>

    {{-- <script>
        var toggle = document.getElementsByClassName("sidebar-item");

        for (var i = 0; i < toggle.length; i++) {
            toggle[i].addEventListener("click", function() {
                var current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            });
        }
    </script> --}}

    @section('js')
    @show
</body>







</html>
