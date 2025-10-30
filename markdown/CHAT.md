# 💬 Chat Akış Dokümantasyonu

## 🎯 Genel Akış

### Senaryo 1: Yeni Chat Başlatma

```
1. Kullanıcı "/" adresine girer (DashboardPage)
   └─ conversationId: null
   └─ Empty state gösterilir
   └─ ChatPrompt input bekler

2. Kullanıcı ilk mesajı yazar ve Enter'a basar
   └─ useCreateMessage.mutate() çağrılır
   └─ onMutate: Optimistic update (yeni conversation için geçici state)

3. Backend'den cevap gelir
   └─ Response içinde conversation_id var
   └─ onSuccess çalışır:
      ├─ setConversationId(response.conversation_id)
      ├─ navigate("/chat/${conversation_id}")
      └─ Cache'e kullanıcı ve AI mesajları eklenir

4. URL değişir: "/chat/abc123"
   └─ ChatPage render edilir
   └─ useGetChat enabled=true olur
   └─ URL'den conversationId alınır
   └─ Cache'den mesajlar gösterilir
```

### Senaryo 2: Mevcut Conversation'da Mesaj Gönderme

```
1. Kullanıcı "/chat/abc123" adresindedir
   └─ conversationId: "abc123"
   └─ useGetChat conversation history'yi yükler
   └─ Mesajlar ChatArea'da gösterilir

2. Kullanıcı yeni mesaj yazar
   └─ useCreateMessage.mutate() çağrılır
   └─ onMutate: Kullanıcı mesajı optimistically eklenir

3. Backend'den cevap gelir
   └─ Response içinde aynı conversation_id var
   └─ onSuccess çalışır:
      ├─ AI cevabı mevcut mesaj listesine eklenir
      └─ navigate() çağrılmaz (zaten conversation'dayız)
```

### Senaryo 3: Sayfa Refresh (F5)

```
1. Kullanıcı "/chat/abc123" adresindeyken F5'e basar
   └─ React uygulaması yeniden mount olur
   └─ ChatPage render edilir
   └─ useParams ile conversationId="abc123" alınır

2. useGetChat çalışır
   └─ enabled: true (conversationId var)
   └─ refetchOnMount: "always"
   └─ Backend'den conversation history çekilir

3. Mesajlar tekrar gösterilir
   └─ Conversation state tam olarak kurtarılır
```

## 🏗️ Mimari Kararlar

### 1. **Source of Truth: URL**

- conversationId her zaman URL'de tutulur
- Zustand store sadece senkronizasyon için kullanılır
- Refresh sonrası URL'den state kurtarılır

### 2. **Optimistic Updates**

- Kullanıcı mesajları anında ekranda gösterilir
- Network hatası durumunda rollback yapılır
- UX iyileştirmesi için kritik

### 3. **Cache Stratejisi**

- React Query cache kullanılır
- staleTime: 5 dakika
- gcTime: 30 dakika
- refetchOnMount: "always" (refresh için)

### 4. **Navigation Mantığı**

- İlk mesaj: navigate("/chat/:id")
- Sonraki mesajlar: navigate() çağrılmaz
- replace: true (browser history'de gereksiz entry olmasın)

## 📋 Best Practices

### ✅ Yapılanlar

1. **URL-First Approach**: State URL'den türetilir
2. **Optimistic UI**: Kullanıcı mesajları anında gösterilir
3. **Error Handling**: Rollback ve notification
4. **Loading States**: Her aşamada uygun loading gösterimi
5. **Cache Management**: Verimli cache stratejisi
6. **Accessibility**: aria-label ve disabled states

### ⚠️ Önemli Notlar

1. **conversationId null kontrolü**: Her yerde null check yapılmalı
2. **useParams dependency**: URL değişince state'i sync et
3. **onSettled invalidation**: Cache'i güncelle
4. **Temporary message IDs**: Optimistic update için unique ID'ler

## 🔧 Hata Ayıklama

### Problem: Mesajlar gözükmüyor

```typescript
// Kontrol listesi:
1. URL'de conversationId var mı? → useParams ile kontrol et
2. useGetChat enabled mi? → conversationId varsa enabled=true
3. Backend'den data geliyor mu? → Network tab'ı kontrol et
4. Cache'de data var mı? → React Query DevTools kullan
```

### Problem: Navigation çalışmıyor

```typescript
// Kontrol listesi:
1. useNavigate hook'u kullanıldı mı?
2. Router setup doğru mu?
3. onSuccess'te conversationId kontrolü var mı?
4. Browser console'da hata var mı?
```

## 🚀 Gelecek İyileştirmeler

1. **Streaming**: Backend stream desteği eklendiğinde
2. **Retry Stratejisi**: Network hatalarında otomatik retry
3. **Message Persistence**: IndexedDB ile offline destek
4. **Real-time Updates**: WebSocket ile canlı güncellemeler
5. **Message Reactions**: Mesajlara reaksiyon ekleme

## 📚 İlgili Dosyalar

```
src/
├── features/chat/
│   ├── hooks/
│   │   ├── use-create-chat.ts       # Mesaj gönderme + navigation
│   │   └── use-get-chatById.ts      # Conversation yükleme
│   ├── store/
│   │   └── chat.store.ts            # conversationId state
│   └── components/
│       ├── chat-area.tsx            # Mesaj listesi
│       └── chat-prompt.tsx          # Input alanı
├── pages/
│   ├── dashboard/
│   │   └── dashboard.page.tsx       # "/" - Yeni chat
│   └── chat/
│       └── chat.page.tsx            # "/chat/:id" - Mevcut chat
└── app/
    └── router.tsx                   # Routing tanımları
```
