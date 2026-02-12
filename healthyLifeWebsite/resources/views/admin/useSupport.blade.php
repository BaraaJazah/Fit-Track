@extends('Layouts.admin')

@section('css')


@endsection

@section('pageName', 'All Users')

@section('content')


    <section class="section">
        <div class="card" style="position: static">
            <div class="card-header">
                <h4 class="card-title">Support Users
                </h4>
            </div>

            <div class="card-content">
                <!-- table striped -->
                <div class="table-responsive">
                    <table class="table mb-0">
                        <thead>
                            <tr>
                                <th style="width:2%"></th>
                                <th style="width:2%">Id</th>
                                <th style="width:8%">Date</th>
                                <th style="width:8%">Name</th>
                                <th style="width:15%">Email</th>
                                <th style="width:15%">Subject</th>
                                <th style="width:24%">Message</th>
                                <th style="width:6%">Readed</th>

                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($messages as $message)
                                @if ($message->readed === 0)
                                    <tr style="background-color: #ccffcc">
                                        <td style="width:2%"></td>
                                        <td style="width:2%">{{ $message->user->id }}</td>
                                        <td style="width:8%">{{ $message->created_at->format('Y-m-d') }}</td>
                                        <td style="width:8%">{{ $message->user->name }}</td>
                                        <td style="width:15%">{{ $message->user->email }}</td>
                                        <td style="width:15%">{{ $message->subject }}</td>
                                        <td style="width:24%">{{ $message->message }}</td>
                                        <td style="width:6%"> <a class="btn btn-sm btn-success text-white  "
                                                href="{{ route('admin.getSupportMessage', $message->id) }}">Read</a>
                                        </td>

                                    </tr>
                                @else
                                    <tr>
                                        <td style="width:2%"></td>
                                        <td style="width:2%">{{ $message->user->id }}</td>
                                        <td style="width:10%">{{ $message->created_at->format('Y-m-d') }}</td>
                                        <td style="width:10%">{{ $message->user->name }}</td>
                                        <td style="width:15%">{{ $message->user->email }}</td>
                                        <td style="width:15%">{{ $message->subject }}</td>
                                        <td style="width:20%">{{ $message->message }}</td>
                                        <td style="width:6%">
                                            <form method="POST" action="{{ route('admin.deleteMessage', $message->id) }}">
                                                @csrf
                                                @method('delete')
                                                <button class="btn btn-sm btn-danger text-white">Delete</button>
                                            </form>
                                        </td>

                                    </tr>
                                @endif
                            @endforeach

                        </tbody>
                    </table>
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
