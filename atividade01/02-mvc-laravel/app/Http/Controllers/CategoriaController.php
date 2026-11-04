<?php

namespace App\Http\Controllers;

use App\Models\Categoria;


class CategoriaController extends Controller
{
    // Listagem: GET /
    public function index()
    {
        $categorias = Categoria::orderBy('id')->get();

        return view('categorias.index', [
            'categorias' => $categorias,
        ]);
    }

    // Detalhe: GET /categorias/{id}
    public function show(int $id)
    {
        // findOrFail devolve 404 automaticamente se a categoria não existir.
        $categoria = Categoria::findOrFail($id);

        return view('categorias.show', [
            'categoria' => $categoria,
        ]);
    }
}
