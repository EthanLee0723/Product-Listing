<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Products extends Model
{
    protected $table = "products";
    protected $primaryKey = "id";
    const CREATED_AT = "created_at";
    const UPDATED_AT = "updated_at";

    public function scopeGeneralQuery($query)
    {
        $list = $this->query()
                     ->whereNull("deleted_at");
    }
}
