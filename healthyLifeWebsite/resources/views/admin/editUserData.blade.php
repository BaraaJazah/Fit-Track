@extends('Layouts.admin')


{{-- css --}}

@section('css')
    <style>

    </style>
    <link rel="stylesheet" href="{{ asset('build/assets/vendors/choices.js/choices.min.css') }}">
@endsection

{{-- page Name --}}

@section('pageName', 'Add Job')


{{-- content --}}
@section('content')

    <section id="multiple-column-form">
        <div class="row match-height">
            <div class="col-12">
                <div class="card" style="position: static;">
                    <div class="card-header">
                        <h4 class="card-title">Update User</h4>
                    </div>
                    <div class="card-content">
                        <div class="card-body">
                            <form action="{{ route('admin.updateDesc', $user->id) }}" method="post" class="form">
                                @csrf
                                @method('post')
                                <div class="row">
                                    <div class="col-md-6 col-12">
                                        <div class="form-group ">
                                            <label for="roundText">ID</label>
                                            <input type="number" id="roundText" class="form-control round mt-2"
                                                placeholder="{{ $user->id }}" readonly>
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-12">
                                        <div class="form-group ">
                                            <label>Name</label>
                                            <input type="text" id="roundText" class="form-control round mt-2"
                                                placeholder="{{ $user->name }}" readonly>
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-12">
                                        <div class="form-group ">
                                            <label>Limit AI</label>
                                            <input type="number" id="roundText" class="form-control round mt-2"
                                                value="{{ $user->userSubscribe->limitAI ?? 0 }}" readonly>
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-12">
                                        <div class="form-group ">
                                            <label>User AI</label>
                                            <input type="number" id="roundText" class="form-control round mt-2"
                                                value="{{ $user->userSubscribe->myAI ?? 0 }}" readonly>
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-12">
                                        <div class="form-group ">
                                            <label>Limit Dish</label>
                                            <input type="number" id="roundText" class="form-control round mt-2"
                                                value="{{ $user->userSubscribe->limitDish ?? 0 }}" readonly>
                                        </div>
                                    </div>


                                    <div class="col-md-6 col-12">
                                        <div class="form-group ">
                                            <label>User Dish</label>
                                            <input type="number" id="roundText" class="form-control round mt-2"
                                                value="{{ $user->userSubscribe->myDish ?? 0 }}" readonly>
                                        </div>
                                    </div>



                                    <div class="col-md-12 col-12">
                                        <div class="form-group ">
                                            <label>* The Value that you will press will added to the value of
                                                user</label>
                                        </div>
                                    </div>


                                    <div class="col-md-6 col-12">
                                        <div class="form-group ">
                                            <label>Limit AI</label>
                                            <input name="limitAI" type="number" id="roundText"
                                                class="form-control round mt-2" value="0">
                                        </div>
                                    </div>


                                    <div class="col-md-6 col-12">
                                        <div class="form-group ">
                                            <label>Limit Dish</label>
                                            <input name="limitDish" type="number" id="roundText"
                                                class="form-control round mt-2" value="0">
                                        </div>
                                    </div>



                                    <div class="col-12 d-flex justify-content-end">
                                        <button type="submit" class="btn btn-primary me-1 mb-1">Update User</button>
                                    </div>
                                </div>
                            </form>
                            <div class="col-12 d-flex justify-content-end" style="transform: translate(-140px , -52px);">
                                {{-- <form action="{{ route('works.destroy', $work) }}" method="POST" style="margin-top: 10px;">
                                    @csrf
                                    @method('DELETE')
                                    <input type="hidden" name="page" value="{{ $next }}">
                                    <button type="submit" class="btn btn-danger">
                                        Delete Work
                                    </button>
                                </form> --}}
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
                    <div class="me-auto fw-semibold" style="color: #262626;">Add Work</div>
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
