@extends('Layouts.admin')

@section('css')


@endsection

@section('pageName', 'All Users')

@section('content')

    <section class="section">
        <div class="card" style="position: static">
            <div class="card-header">
                <h1>All Users</h1>
                <hr style="opacity:1 ;color:#eee">
            </div>


            <div class="card-body">
                <div id="table1_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                    <div class="row mb-3">
                        <div class="col-sm-12">
                            <table class="table dataTable no-footer" id="table12" aria-describedby="table1_info">
                                <thead>
                                    <tr>
                                        <th data-sortable="">Id</th>
                                        <th data-sortable="">Name</th>
                                        <th data-sortable="">Email</th>
                                        <th data-sortable="">Premier</th>
                                        <th data-sortable="">LimitDish</th>
                                        <th data-sortable="">LimitAI</th>
                                        <th data-sortable="">MyDish</th>
                                        <th data-sortable="">MyAI</th>
                                        <th data-sortable=""></th>
                                        <th data-sortable=""></th>

                                    </tr>
                                </thead>
                                <tbody>


                                    @foreach ($users as $el)
                                        <tr>
                                            <td>{{ $el->id }}</td>
                                            <td>{{ $el->name }}</td>
                                            <td>{{ $el->email }}</td>
                                            <td>{{ $el->userSubscribe?->premier ?? '-' }}</td>
                                            <td>{{ $el->userSubscribe?->limitDish ?? '-' }}</td>
                                            <td>{{ $el->userSubscribe?->limitAI ?? '-' }}</td>
                                            <td>{{ $el->userSubscribe?->myDish ?? '-' }}</td>
                                            <td>{{ $el->userSubscribe?->myAI ?? '-' }}</td>
                                            <td><a href="{{ route('admin.editUserData', $el->id) }}"
                                                    class="btn btn-info">Edit</a></td>
                                            <td>
                                                <form method="POST" action="{{ route('admin.deleteUser', $el->id) }}"
                                                    onsubmit="return confirm('Are you sure you want to delete this user?')">
                                                    @csrf
                                                    @method('delete ')
                                                    <button type="submit" class="btn btn-danger">Delete</button>
                                                </form>
                                            </td>

                                        </tr>
                                    @endforeach


                                </tbody>

                            </table>
                            <div style="">

                                {{ $users->links() }}
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
