<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Application extends Model
{
    use HasUuid;

    public const CLOSED = 'Завершено';
    public const OPENED = 'Новое';

    protected $guarded = [];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function closedBy() {
        return $this->belongsTo(User::class, 'closed_by', 'id');
    }

    public function scopeFilterByStatus($q, $status = null) {
        if(!$status) {
            return $q;
        }

        return $q->whereIn('status', $status);
    }

    public function scopeFilterById($q, $id = null) {
        if(!$id) {
            return $q;
        }

        return $q->where('id', 'LIKE', '%'.$id.'%');
    }

    public function scopeFilterByEmployee($q, $ids = null) {
        if(!$ids) {
            return $q;
        }

        return $q->whereIn('user_id', $ids);
    }

    public function scopeFilterByPhone($q, $phone = null) {
        if(!$phone) {
            return $q;
        }

        return $q->where('id', 'LIKE', '%'.$phone.'%');
    }

    public function scopeFilterByDate($q, $period = null)
    {
        if (!$period || count($period) < 2) {
            return $q;
        }

        return $q->whereBetween('created_at', [Carbon::parse($period[0]), Carbon::parse($period[1])]);
    }
}