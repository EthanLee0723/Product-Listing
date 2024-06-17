<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;


class Products extends Model
{
    protected $table = "products";
    protected $primaryKey = "id";
    const CREATED_AT = "created_at";
    const UPDATED_AT = "updated_at";

    public function  getCreatedAtAttribute($val)
    {
        return Carbon::parse($val)->toDateTimeString();
    }

    public function scopeGeneralQuery($query)
    {
        return $this->query()
                     ->whereNull("deleted_at");
    }
}
