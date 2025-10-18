<!-- sequenceDiagram
participant U as User
participant CP as ChatPrompt
participant SM as useCreateChat
participant QC as QueryClient Cache
participant API as Backend API
participant CA as ChatArea

    Note over U,CA: 1. İlk Yükleme (Sayfa Açılışı)
    CA->>QC: useGetChatById() çalışır
    QC->>API: GET /messages/:conversationId
    API-->>QC: Eski mesajları döner

    QC-->>CA: Mesajları göster

    Note over U,CA: 2. Yeni Mesaj Gönderme
    U->>CP: Mesaj yazar ve gönderir
    CP->>SM: createChat(userMessage)

    Note over SM,QC: Optimistic Update (onMutate)
    SM->>QC: setQueryData - userMessage ekle
    QC-->>CA: UI anında güncellenir ✨

    SM->>API: POST /chat/send

    Note over API: AI response üretiyor...

    API-->>SM: AI response döner

    Note over SM,QC: Success (onSuccess)
    SM->>QC: setQueryData - AI response ekle
    QC-->>CA: AI cevabı ekranda görünür

    Note over SM,QC: Settled (onSettled)
    SM->>QC: invalidateQueries - fresh data çek

    Note over U,CA: 3. Sayfa Refresh
    U->>CA: F5 / Refresh
    CA->>QC: useGetChatById() tekrar çalışır
    QC->>API: Cache varsa oradan, yoksa GET /messages
    API-->>QC: Güncel mesajlar
    QC-->>CA: Tüm konuşma gösterilir -->
