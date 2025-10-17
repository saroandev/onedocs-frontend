---

POST /chat/process - Frontend API Dökümantasyonu

Endpoint

POST http://your-api-url/chat/process

Headers (Zorunlu)

{
"Authorization": "Bearer <JWT_TOKEN>",
"Content-Type": "application/json"
}

---

Request Body Alanları

1. question (string) - ZORUNLU

Kullanıcının soracağı soru.

"question": "İcra ve İflas Kanunu nedir?"

---

2. sources (array) - ZORUNLU

Hangi veri kaynaklarında arama yapılacağını belirler. Boş bırakılırsa arama yapılmaz!

İzin verilen değerler:

- "private" - Kullanıcının kendi özel dokümanları
- "shared" - Organizasyonun paylaşılan dokümanları
- "mevzuat" - Harici mevzuat veritabanı (Global DB)
- "karar" - Harici mahkeme kararları veritabanı (Global DB)
- "all" - Hem private hem shared (genişler)

Örnekler:
// Sadece mevzuat ara
"sources": ["mevzuat"]

// Kullanıcının kendi dokümanları + mevzuat
"sources": ["private", "mevzuat"]

// Sadece organizasyon paylaşılan dokümanları
"sources": ["shared"]

// Hem kendi hem organizasyon dokümanları + her iki global DB
"sources": ["private", "shared", "mevzuat", "karar"]

---

3. collections (array | null) - OPSİYONEL

Belirli koleksiyonlarda arama yapar. Eğer null veya belirtilmezse, hiçbir koleksiyonda arama yapılmaz.

Her bir koleksiyon filtresi:
{
"name": "sozlesmeler", // Koleksiyon adı (Türkçe karakter destekli)
"scopes": ["private", "shared"] // Bu koleksiyonun hangi scope'larda aranacağı
}

Önemli:

- scopes sadece "private" veya "shared" olabilir
- "mevzuat" ve "karar" scopes'unda kullanılamaz (bunlar sources parametresinden gelir)

Örnek:
"collections": [
{
"name": "sozlesmeler",
"scopes": ["private", "shared"] // Hem kendi hem org. sözleşmelerinde ara
},
{
"name": "kanunlar",
"scopes": ["private"] // Sadece kendi kanunlarında ara
}
]

Null yapılabilir:
"collections": null // Hiçbir koleksiyonda arama yapma

---

4. top_k (integer) - OPSİYONEL

Vector DB'den maksimum kaç kaynak alınacağı.

- Varsayılan: 5
- Min: 1
- Max: 20

"top_k": 10

---

5. use_reranker (boolean) - OPSİYONEL

Daha iyi sonuçlar için reranking kullanılsın mı?

- Varsayılan: true

"use_reranker": true

---

6. min_relevance_score (float) - OPSİYONEL

Kaynakların dahil edilmesi için minimum benzerlik skoru (cosine similarity).

- Varsayılan: 0.7
- Min: 0.0
- Max: 1.0
- Yüksek değer = daha katı filtreleme

"min_relevance_score": 0.75

---

7. include_low_confidence_sources (boolean) - OPSİYONEL

Düşük güvenilirlikli kaynaklar yanıtta ayrı bir listede mi dönülsün?

- Varsayılan: false

"include_low_confidence_sources": true

---

8. max_sources_in_context (integer) - OPSİYONEL

LLM'e gönderilecek maksimum yüksek güvenilirlikli kaynak sayısı.

- Varsayılan: 5
- Min: 1
- Max: 10

"max_sources_in_context": 7

---

9. options (object | null) - OPSİYONEL

LLM yanıt davranışlarını kontrol eder.

options.tone (string) - OPSİYONEL

Yanıt tonu:

- "resmi" - Resmi (varsayılan)
- "samimi" - Samimi
- "teknik" - Teknik
- "öğretici" - Öğretici

options.lang (string) - OPSİYONEL

Yanıt dili:

- "tr" - Türkçe (varsayılan)
- "eng" - İngilizce

options.citations (boolean) - OPSİYONEL

Kaynak alıntıları ([Kaynak 1], [Kaynak 2]) dahil edilsin mi?

- Varsayılan: true

options.stream (boolean) - OPSİYONEL

Streaming yanıt (SSE) - gelecek özellik

- Varsayılan: false

Örnek:
"options": {
"tone": "resmi",
"lang": "tr",
"citations": true,
"stream": false
}

Null yapılabilir:
"options": null // Varsayılan değerler kullanılır

---

Tam Örnek Request

Minimal Request (Sadece zorunlu alanlar):

{
"question": "İcra ve İflas Kanunu nedir?",
"sources": ["mevzuat"]
}

Tam Request (Tüm opsiyonlarla):

{
"question": "İcra ve İflas Kanunu nedir?",
"sources": ["private", "mevzuat"],
"collections": [
{
"name": "sozlesmeler",
"scopes": ["private", "shared"]
},
{
"name": "kanunlar",
"scopes": ["private"]
}
],
"top_k": 10,
"use_reranker": true,
"min_relevance_score": 0.75,
"include_low_confidence_sources": true,
"max_sources_in_context": 7,
"options": {
"tone": "resmi",
"lang": "tr",
"citations": true,
"stream": false
}
}

---

Response (200 OK)

{
"answer": "İcra ve İflas Kanunu, alacaklıların haklarını korumak...",
"sources": [
{
"rank": 1,
"score": 0.95,
"document_id": "doc_123",
"document_name": "icra_iflas_kanunu.pdf",
"document_title": "İcra ve İflas Kanunu",
"document_url": "https://minio.../doc_123.pdf",
"page_number": 5,
"text_preview": "İcra ve iflas hukuku...",
"created_at": 1704067200
}
],
"processing_time": 2.45,
"model_used": "gpt-4o-mini",
"tokens_used": 1250,
"remaining_credits": 9800,
"total_sources_retrieved": 10,
"sources_after_filtering": 5,
"min_score_applied": 0.75,
"low_confidence_sources": [ // Sadece include_low_confidence_sources=true ise
{
"rank": 6,
"score": 0.68,
"document_id": "doc_456",
// ... diğer alanlar
}
]
}

---

Hata Durumları

401 Unauthorized

JWT token geçersiz veya eksik.

500 Internal Server Error

{
"detail": "Query failed: <error message>"
}

---

Frontend TypeScript Tipleri

// Request types
interface CollectionFilter {
name: string;
scopes: ('private' | 'shared')[];
}

interface QueryOptions {
tone?: 'resmi' | 'samimi' | 'teknik' | 'öğretici';
lang?: 'tr' | 'eng';
citations?: boolean;
stream?: boolean;
}

interface QueryRequest {
question: string; // ZORUNLU
sources: ('private' | 'shared' | 'mevzuat' | 'karar' | 'all')[]; // ZORUNLU
collections?: CollectionFilter[] | null;
top_k?: number;
use_reranker?: boolean;
min_relevance_score?: number;
include_low_confidence_sources?: boolean;
max_sources_in_context?: number;
options?: QueryOptions | null;
}

// Response types
interface QuerySource {
rank: number;
score: number;
document_id: string;
document_name: string;
document_title: string;
document_url: string;
page_number: number;
text_preview: string;
created_at: number;
}

interface QueryResponse {
answer: string;
sources: QuerySource[];
processing_time: number;
model_used: string;
tokens_used: number;
remaining_credits: number;
total_sources_retrieved: number;
sources_after_filtering: number;
min_score_applied: number;
low_confidence_sources?: QuerySource[] | null;
}

---

Önemli Notlar

1. JWT Authentication: Her request'te geçerli bir JWT token gereklidir
2. sources boş bırakılamaz: En az bir kaynak seçilmeli
3. collections vs sources:


    - collections: Milvus'taki özel koleksiyonlarınız (private/shared)
    - sources: Hem koleksiyonlar hem de global DB'ler (mevzuat/karar)

4. Performans: top_k ve max_sources_in_context değerleri yüksek tutulursa işlem süresi artar
5. Rate limiting: API'nin rate limit politikası varsa dikkate alınmalı
