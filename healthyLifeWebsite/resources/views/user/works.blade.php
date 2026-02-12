@extends('Layouts.user')



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
@endsection

@section('pageName', 'Home')

@section('content')
    <section class="section">
        <div class="card" style="position: static">
            <div class="card-header">
                <h1>Works State</h1>
                <hr style="opacity:1 ;color:#eee">
            </div>


            <div class="card-body">
                <div id="table1_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                    <div class="row mb-3">
                        <div class="col-sm-12">
                            <table class="table dataTable no-footer" id="table1" aria-describedby="table1_info">
                                <thead>
                                    <tr>
                                        <th>Work Name</th>
                                        <th>Work Explane</th>

                                        <th>State</th>
                                        <th>Start Date</th>
                                        <th>Change State</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($works as $work)
                                        <tr>
                                            <td>{{ $work->name }}</td>
                                            <td>
                                                <button class="openModalBtn" style="border:none;background: none"
                                                    data-modal-id="myModal-{{ $work->id }}">
                                                    <img style="width: 30px;height: 30px;"
                                                        src="{{ asset('build/assets/images/icons/details.png') }}" />
                                                </button>
                                            </td>

                                            @if ($work->status == 'active')
                                                <td><span class="badge bg-primary">{{ $work->status }}</span></td>
                                            @elseif ($work->status == 'continue')
                                                <td><span class="badge bg-info">{{ $work->status }}</span></td>
                                            @elseif ($work->status == 'wait')
                                                <td><span class="badge bg-danger">{{ $work->status }}</span></td>
                                            @else
                                                <td><span class="badge bg-success">{{ $work->status }}</span></td>
                                            @endif

                                            @php
                                                $createdAt = \Carbon\Carbon::parse($work->created_at)->format(
                                                    'Y-m-d H:i',
                                                );
                                            @endphp

                                            <td>{{ $createdAt }}</td>
                                            <form action="{{ route('user.chnageState', $work->id) }}" method="POST">
                                                @csrf
                                                @method('POST')
                                                <td>
                                                    <fieldset class="form-group">
                                                        <select class="form-select mt-2 " name="status">
                                                            <option value="{{ $work->status }}"> {{ $work->status }}
                                                            </option>
                                                            @php
                                                                $states = ['continue', 'wait', 'finish'];
                                                            @endphp
                                                            @foreach ($states as $state)
                                                                @if ($state != $work->status)
                                                                    <option value="{{ $state }}">
                                                                        {{ $state }}
                                                                    </option>
                                                                @endif
                                                            @endforeach
                                                        </select>
                                                    </fieldset>
                                                </td>

                                                <td>
                                                    <div class="col-12 d-flex justify-content-end">
                                                        <button id="formHandler" type="submit" class="btn me-1 mb-1">
                                                            {{-- button --}}
                                                            <img style="width: 30px;height: 30px;"
                                                                src="{{ asset('build/assets/images/icons/save.png') }}" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </form>

                                        </tr>

                                        <div id="myModal-{{ $work->id }}" class="modal">
                                            <div class="modal-content">
                                                <div class="close-btn">
                                                    <div class="close-btn-bg">
                                                        <img class="close-icon"
                                                            src="{{ asset('build/assets/images/icons/close.png') }}" />
                                                    </div>
                                                </div>
                                                <div style="transform: translateY(-40px)">
                                                    <h1 style="text-transform: capitalize">{{ $work->name }}</h1>
                                                    <hr>
                                                    <p>{{ $work->explane }}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- مودال خاص بكل صف -->
                                    @endforeach
                                </tbody>
                            </table>
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
            <div class="bs-toast toast fade show  " role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <i class="bx bx-bell me-2"></i>
                    <div class="me-auto fw-semibold " style="color: #262626">Update Work
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body " style="color: #262626 ; background-color: #D2FFE7">
                    {{ Session::get('successfully') }}
                </div>
            </div>
        @endif

        {{--  any error --}}
        @if ($errors->any())

            @foreach ($errors->all() as $error)
                <div class="bs-toast toast fade show " role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <i class="bx bx-bell me-2"></i>
                        <div class="me-auto fw-semibold" style="color: #262626">Error : (</div>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body" style="color: #fff;background-color: #FFDEDE">
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
