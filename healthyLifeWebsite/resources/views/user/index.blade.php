@extends('Layouts.user')


@section('css')
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

@section('pageName', 'Add Job')



@section('content')
    <section id="hero" style="background-color: #fff;padding:60px;border-radius: 24px"
        class="hero section dark-background">

        <div class="container">
            <div class="row gy-4">
                <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center aos-init aos-animate"
                    data-aos="zoom-out">
                    <h1 style="text-transform: capitalize">Merhaba {{ Auth::user()->name }} </h1>

                    <br> <br><br>
                    <p style="font-size: 24px"><span
                            style="font-size: 28px;font-weight: 700;color:#25386F">{{ $unit->name }}
                            Birim
                        </span> hassasiyet ve
                        kaliteyle olağanüstü
                        inşaat projeleri üreten yetenekli bir
                        inşaat ekibiyiz.
                    </p>
                </div>
                <div class="col-lg-6 order-1 order-lg-2 hero-img aos-init aos-animate" data-aos="zoom-out"
                    data-aos-delay="200">
                    <img src="{{ asset('build/assets/images/bg/hero-img.png') }}" class="img-fluid animated" alt="">
                </div>
            </div>
        </div>
    </section>

    <br><br>

        <section class="section">
            <div class="card">
                <div class="card-header">
                    <h1>Ekip Bilgileri</h1>
                </div>
                <div class="card-body">
                    <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">

                        <div class="dataTable-container">
                            <table class="table table-striped dataTable-table" id="table1">
                                <thead>
                                    <tr>
                                        <th data-sortable="" style="width: 15.8191%;">Name</th>
                                        <th data-sortable="" style="width: 15.8294%;">Email</th>
                                        <th data-sortable="" style="width: 15%;">Phone</th>
                                        <th data-sortable="" style="width: 15.0997%;"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($ekip as $el)
                                        <tr>
                                            <td>{{ $el->name }}</td>
                                            <td>{{ $el->email }}</td>
                                            <td>{{ $el->phone }}</td>
                                            <td>
                                                @if ($el->isResonsible == 1)
                                                    <span class="badge bg-success">Ekip Başı</span>
                                                @else
                                                @endif
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>

        </section>

@endsection


@section('js')
@endsection
