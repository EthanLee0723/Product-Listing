<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    protected $table = "product_category";
    protected $primaryKey = "id";
    const CREATED_AT = "created_at";
    const UPDATED_AT = "updated_at";

    public function getSubcategoryIdAttribute($val)
    {
        if($val)
        {
            return is_array($val)?$val:json_decode($val,true);
        }
        else
        {
            return null;
        }
    }

    public function getSubcategoryNameAttribute($val)
    {
        if($val)
        {
            return is_array($val)?$val:json_decode($val,true);
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
