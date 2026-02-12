<?php

namespace App\Http\Controllers;

use App\Models\Support;
use Illuminate\Http\Request;

class SupportController extends Controller
{
    public function supportPage()
    {
        $messages = Support::with('user')->orderBy("readed")->orderBy('created_at', 'desc')->get();
        return View('admin.useSupport', compact('messages'));
    }

    public function getSupportMessage($id)
    {
        $message = Support::with('user')->where("id", $id)->get()->first();
        return View('admin.supportMessage', compact('message'));
    }

    public function setReaded($id)
    {

        $message = Support::find($id);
        $message->update([
            'readed'  => 1,
        ]);
        return redirect()->route('admin.supportPage');
    }



    public function deleteMessage($id)
    {
        Support::destroy($id);
        return redirect()->back();
    }
}
