<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
    public function generate(Request $request)
    {
        // 1. كنستقبلو الوصف من عند الفرونت-اند
        $prompt = $request->input('prompt');

        if (!$prompt) {
            return response()->json(['error' => 'No prompt provided'], 400);
        }

        // 2. كنعيطو لـ Hugging Face باش يصاوب التصويرة
        $imageName = $this->generateImage($prompt);

        if (!$imageName) {
            return response()->json(['error' => 'Failed to generate image with Hugging Face'], 500);
        }

        // 3. كنرجعو النتيجة (مؤقتاً غير التصويرة باش نجربو)
        return response()->json([
            'status' => 'success',
            'image_url' => asset('storage/' . $imageName),
            'message' => 'Image generated successfully!'
        ]);
    }

private function generateImage($prompt)
{
    // الحل السحري: Pollinations AI (بلا API Key بلا صداع)
    // كنصيفطو الوصف فالعنوان ديريكت
    $url = "https://image.pollinations.ai/prompt/" . urlencode($prompt);

    try {
        // كنجيبو التصويرة
        $imageContent = file_get_contents($url);

        if ($imageContent) {
            $name = 'generated_' . time() . '.jpg';
            // نسجلوها فالدوسي public
            Storage::disk('public')->put($name, $imageContent);
            return $name;
        }
    } catch (\Exception $e) {
        return null; // إلا وقع شي مشكل فالنت
    }

    return null;
}
}