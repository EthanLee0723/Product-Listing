<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerInbox extends Model
{
    protected $table = "customer_inbox";
    protected $primaryKey = "id";
    const CREATED_AT = "created_at";
    const UPDATED_AT = "updated_at";

    public function scopeGeneralQuery($query)
    {
        return $this->query()
                     ->whereNull("deleted_at");
    }
}
