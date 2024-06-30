<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactUs extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */

    protected $msg;
    protected $contactNo;
    protected $name;
    protected $email;

    public function __construct($name,$contactNo,$msg,$email)
    {
        $this->name = $name;
        $this->contactNo = $contactNo;
        $this->msg = $msg;
        $this->email = $email;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from("id.smurfing001@gmail.com")
                    ->subject("Goods To You Incoming customer message")
                    ->view("emailTemplates.contactUsTemplate")
                    ->with([
                        "name"=> $this->name,
                        "contactNo"=>$this->contactNo,
                        "email"=>$this->email,
                        "msg"=>$this->msg
                    ]);
    }
}
