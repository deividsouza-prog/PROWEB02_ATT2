@extends('layouts.app')

@section('titulo', $categoria->nome . ' — Laravel MVC')

@section('conteudo')
    <span class="badge">Projeto 2 · Laravel MVC</span><br>
    <a class="voltar" href="/categorias">← Voltar para categorias</a>

    <div class="detalhe">
        <div class="emoji">{{ $categoria->emoji }}</div>
        <div class="info">
            <h1>{{ $categoria->nome }}</h1>
            <p class="desc">{{ $categoria->descricao }}</p>
        </div>
    </div>

    <h2>Produtos desta categoria</h2>
    <div class="grid">
        {{-- $produtos vem pronto do Controller: são os produtos cuja coluna
             `categoria` bate com o nome desta categoria. --}}
        @forelse ($produtos as $produto)
            <a class="card" href="/produtos/{{ $produto->id }}">
                <div class="emoji">{{ $produto->emoji }}</div>
                <p class="nome">{{ $produto->nome }}</p>
                <p class="preco">R$ {{ number_format($produto->preco, 2, ',', '.') }}</p>
            </a>
        @empty
            <p class="desc">Nenhum produto cadastrado nesta categoria.</p>
        @endforelse
    </div>
@endsection
