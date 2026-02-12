@extends('Layouts.admin')

@section('css')


@endsection

@section('pageName', 'All Users')

@section('content')


    <section class="section">
        <div class="card" style="position: static">
            <div class="card-content">
                <!-- table striped -->
                <div class="col-md-8 col-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">User Message</h4>
                        </div>


                        <div class="card-content">
                            <div class="card-body">
                                <form class="form form-horizontal" method="POST"
                                    action="{{ route('admin.setReaded', $message->id) }}">
                                    @csrf
                                    @method('PUT')
                                    <div class="form-body">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>User ID</label>
                                            </div>
                                            <div class="col-md-8 form-group">
                                                <label>{{ $message->user->id }}</label>
                                            </div>
                                            <div class="col-md-4">
                                                <label>Name</label>
                                            </div>
                                            <div class="col-md-8 form-group">
                                                <label>{{ $message->user->name }}</label>

                                            </div>
                                            <div class="col-md-4">
                                                <label>Email</label>
                                            </div>
                                            <div class="col-md-8 form-group">
                                                <label> {{ $message->user->email }}</label>

                                            </div>
                                            <div class="col-md-4">
                                                <label>Subject</label>
                                            </div>
                                            <div class="col-md-8 form-group">
                                                <label> {{ $message->subject }}</label>
                                            </div>

                                            <div class="col-md-4">
                                                <label>Message</label>
                                            </div>
                                            <div class="col-md-8 form-group">
                                                <label> {{ $message->message }}</label>
                                            </div>


                                            <div class="col-md-4 mt-5">
                                                {{-- <button type="submit" class="btn btn-primary me-1 mb-1">Submit
                                                        </button> --}}
                                            </div>

                                            <div class="col-md-4 mt-5">
                                                <button type="submit" class="btn btn-success me-1 mb-1">Readed
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </form>
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


@endsection
