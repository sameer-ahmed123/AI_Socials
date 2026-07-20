# Media App

The `media_app` is responsible for handling all media uploads within the project.

At the moment it only supports **image uploads**, but it has been intentionally designed so support for videos, documents, avatars, or other media types can be added later without requiring changes to the rest of the application.

---

# Philosophy

Media is treated as its own bounded domain instead of being tightly coupled to Posts.

Instead of allowing the Posts app to communicate directly with Cloudinary, every upload flows through the Media app.

This gives us a single place responsible for:

- validating uploads
- communicating with cloud storage
- persisting media metadata
- hiding storage provider implementation details
- allowing future storage providers to be swapped easily

The Posts app only knows that "media exists."

It does **not** know where files are stored.

---

# Why upload through Django instead of directly from React?

There are two common approaches.

## Option 1

React uploads directly to Cloudinary.

```
Browser
    │
    ▼
Cloudinary
    │
    ▼
Backend
```

Advantages:

- slightly faster
- backend bandwidth is reduced

Disadvantages:

- Cloudinary credentials become exposed
- upload validation becomes harder
- upload authorization becomes harder
- difficult to switch storage providers later

---

## Option 2 (Chosen)

```
React
   │
   ▼
Django
   │
   ▼
Cloudinary
```

Advantages:

- authentication stays on the backend
- validation stays on the backend
- storage provider can change without frontend changes
- upload logic exists in one place
- backend owns the upload lifecycle

The additional network hop is insignificant compared to the maintainability gained.

---

# Architecture

```
Frontend
      │
      ▼
POST /api/media/upload/
      │
      ▼
MediaUploadSerializer
      │
      ▼
StorageProvider
      │
      ▼
CloudinaryStorage
      │
      ▼
Cloudinary
```

Cloudinary returns

```
public_id
image_url
width
height
```

These values are returned back to the frontend.

The frontend immediately sends them with the Post creation request.

---

# Storage Provider Pattern

Instead of importing Cloudinary everywhere, the application communicates with an abstraction.

```
StorageProvider
        ▲
        │
CloudinaryStorage
```

Current implementation:

```
storage.upload(file)
storage.delete(public_id)
```

If another provider (AWS S3, Azure Blob, MinIO, local storage, etc.) is needed in the future, only the storage implementation changes.

No views or serializers need modification.

---

# Upload Flow

```
User selects image
        │
        ▼
React preview
        │
        ▼
User clicks Post
        │
        ▼
POST /media/upload
        │
        ▼
Image uploaded to Cloudinary
        │
        ▼
Cloudinary metadata returned
        │
        ▼
Frontend receives metadata
        │
        ▼
POST /posts/
        │
        ▼
Post + PostMedia created
```

This two-step flow ensures that media exists before the post is created.

---

# Why not create PostMedia during upload?

This was considered during development.

Early implementation looked like:

```
Upload image
      │
      ▼
Create PostMedia
      │
      ▼
Create Post
```

This caused several problems.

A media upload does **not** yet belong to any Post.

Creating a `PostMedia` object immediately required a `post_id`, resulting in database integrity errors.

```
IntegrityError

Column 'post_id' cannot be null
```

---

Instead I changed the architecture.

Upload endpoint now only uploads to Cloudinary.

It returns metadata:

```
{
    public_id,
    image_url,
    width,
    height
}
```

Later, when the user actually creates a Post, the serializer creates the `PostMedia` object together with the Post.

This keeps the database consistent.

---

# Validation

Current validation:

- authenticated user required
- image uploads only
- maximum size: 5 MB

Future validation ideas:

- image dimensions
- MIME whitelist
- duplicate detection
- NSFW moderation
- virus scanning
- EXIF stripping

---

# Current Responsibilities

The Media app currently provides:

- upload endpoint
- upload validation
- Cloudinary integration
- storage abstraction
- media metadata generation

---

# Future Work

Planned improvements include:

## Video uploads

The architecture already supports multiple storage types.

Only a new upload strategy will be required.

---

## Multiple images per post

Current design already supports this.

`PostMedia` uses a ForeignKey:

```
Post
   │
   ├── Image 1
   ├── Image 2
   ├── Image 3
```

A future frontend can simply upload multiple files.

---

## Media deletion

Unused Cloudinary images should eventually be cleaned automatically.

Possible approaches:

- scheduled cleanup
- orphan detection
- soft delete
- background Celery jobs

---

## Image transformations

Cloudinary supports:

- thumbnails
- responsive sizes
- WebP conversion
- AVIF conversion
- cropping
- compression

These can be added without changing stored media.

---

# Design Decisions

During Sprint 12 I intentionally chose:

- backend-managed uploads
- Cloudinary hidden behind a storage abstraction
- image-only support initially
- upload before post creation
- media metadata returned to frontend
- PostMedia created only when Post is created
- architecture prepared for future multi-image support
- future storage providers hidden behind the same interface

The goal of this sprint was **not** to build every media feature immediately.

https://excalidraw.com/?element=k9q2t3svLP1qRc1Iu4nL0