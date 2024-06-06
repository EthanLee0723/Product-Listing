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
        return json_decode($val);
    }

    public function getSubcategoryNameAttribute($val)
    {
        return json_decode($val);
    }

    public function scopeGeneralQuery($query)
    {
        $list = $this->query()
                     ->whereNull("deleted_at");
    }
}
