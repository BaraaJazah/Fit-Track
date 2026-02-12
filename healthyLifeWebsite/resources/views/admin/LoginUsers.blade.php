@extends('Layouts.admin')

@section('css')


@endsection

@section('pageName', 'All Users')

@section('content')

    <section class="section">
        <div class="card" style="position: static">
            <div class="card-header">
                <h1>Login Users</h1>
                <hr style="opacity:1 ;color:#eee">
            </div>

            <form action="{{ route('admin.loginUserThisDay') }}" method="POST">
                @csrf
                @method('POST')
                <div class="card-header col-md-6">
                    <div style="margin-bottom: 20px">
                        <label for="basicInput">Date</label>
                        <input name="date" type="date" class="form-control" id="basicInput"
                            value="{{ old('date') }}" max="{{ \Carbon\Carbon::today()->format('Y-m-d') }}">
                    </div>
                    <button class="btn btn-primary">Search</button>
                </div>

            </form>

            <div class="card-body">
                <div id="table1_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                    <div class="row mb-3">
                        <div class="col-sm-12">
                            <div>
                                <p>
                                    Day : {{ $date ?? 'non' }}</p>
                            </div>
                            <table class="table dataTable no-footer" id="table12" aria-describedby="table1_info">
                                <thead>
                                    <tr>
                                        <th data-sortable="">Id</th>
                                        <th data-sortable="">Name</th>
                                        <th data-sortable="">Register Date</th>
                                        <th data-sortable="">Email</th>
                                        <th data-sortable="">Premier</th>
                                        <th data-sortable="">Is Today Login</th>
                                        <th data-sortable=""></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    @foreach ($LoginUsers as $el)
                                        <tr>
                                            <td>{{ $el->users->id }}</td>
                                            <td>{{ $el->users->name }}</td>
                                            <td>{{ $el->users->created_at->format('Y-m-d') }}</td>
                                            <td>{{ $el->users->email }}</td>
                                            <td>{{ $el->users->userSubscribe?->premier ?? 0 }}</td>

                                            <td>1</td>
                                            <td><a href="{{ route('admin.LoginDetails', $el->users->id) }}">Details</a>
                                            </td>
                                        </tr>
                                    @endforeach


                                </tbody>

                            </table>
                            <div style="">

                                {{ $LoginUsers->links() }}
                            </div>

                        </div>

                        <div class="card-header">

                            <h4 class="card-title">Num Logins Today For All users : {{ count($LoginUsers) }}
                            </h4>
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
