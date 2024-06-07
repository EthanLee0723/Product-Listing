<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSubcategory extends Model
{
    protected $table = "product_subcategory";
    protected $primaryKey = "id";
    const CREATED_AT = "created_at";
    const UPDATED_AT = "updated_at";

    public function getProductIdAttribute($val)
    {
        if($val)
        {
            return is_array($val)?$val:json_decode($val);
        }
        else
        {
            return null;
        }
    }

    public function getProductNameAttribute($val)
    {
        if($val)
        {
            return is_array($val)?$val:json_decode($val);
        }
        else
        {
            return null;
        }
    }

    public function scopeGeneralQuery($query)
    {
        $list = $this->query()
                     ->whereNull("deleted_at");
    }
}
