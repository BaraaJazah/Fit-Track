@extends('Layouts.admin')

@section('css')


@endsection

@section('pageName', 'All Users')

@section('content')


    <section class="section">
        <div class="row" id="table-striped">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Login Detials</h4>
                    </div>
                    <div class="card-content">
                        <!-- table striped -->
                        <div class="table-responsive">
                            <div class="card-header">
                                <h4 class="card-title">ID : {{ $id }} </h4>
                                <h4 class="card-title">Num Login Days : {{ count($user->userLogin) }} </h4>
                                <h4 class="card-title">Register Date : {{ $userRegister->format('Y-m-d') }} </h4>

                            </div>
                            <table class="table table-striped mb-0">
                                <thead>
                                    <tr>
                                        <th style="width:10%"></th>
                                        <th>Date</th>
                                        <th></th>

                                    </tr>
                                </thead>
                                <tbody>

                                    @foreach ($user->userLogin as $use)
                                        <tr>
                                            <td></td>
                                            <td class="text-bold-500">{{ $use->date }}</td>
                                            <td>1</td>

                                        </tr>
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


@endsection
