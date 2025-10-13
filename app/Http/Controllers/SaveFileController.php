<?php

namespace App\Http\Controllers;

use App\Models\SaveFile;
use Illuminate\Http\Request;

class SaveFileController extends Controller
{
    public function index()
    {
        return SaveFile::get();
    }

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            SaveFile::create($request->post());
            DB::commit();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function show($id)
    {
        //
        $saveFile = SaveFile::findOrFail($id);
        return $saveFile;
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();
            $saveFile = SaveFile::findOrFail($id);
            $saveFile->update($request->post());
            $saveFile->save();
            DB::commit();
        } catch (\Throwable $th) {
            throw $th;
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $saveFile = SaveFile::findOrFail($id);
        $saveFile->delete();
    }
}
