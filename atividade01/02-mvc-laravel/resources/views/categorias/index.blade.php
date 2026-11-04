@extends('layouts.app')

@section('titulo', 'Categorias — Laravel MVC')

@section('conteudo')
    <span class="badge">Projeto 2 · Laravel MVC</span>
    <h1>🗂️ Categorias</h1>
    <p class="sub">A View apenas exibe. Quem buscou os dados foi o Controller, através do Model.</p>

    <div class="grid">
        {{-- A View recebe $categorias pronto do Controller e só percorre a lista. --}}
        @foreach ($categorias as $categoria)
            <a class="card" href="/categorias/{{ $categoria->id }}">
                <div class="emoji">{{ $categoria->emoji }}</div>
                <p class="nome">{{ $categoria->nome }}</p>
                <p class="desc">{{ $categoria->descricao }}</p>
            </a>
        @endforeach
    </div>
@endsection
