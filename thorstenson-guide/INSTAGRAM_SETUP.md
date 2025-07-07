# Instagram Setup Guide for Thorstenson Guide Service

## For Brittney - Account Setup

### 1. Create Instagram Business Account
1. Download Instagram app
2. Sign up with username: `thorstenson_guide`
3. Go to Settings → Account → Switch to Professional Account
4. Choose "Business" (not Creator)
5. Select category: "Outdoor & Sporting Goods Company" or "Travel Company"

### 2. Complete Your Profile
**Profile Picture**: Use a clear photo of James with a nice catch or your logo

**Bio** (150 characters max):
```
🎣 Ely, MN Fishing Guide
🏞️ Boundary Waters Expert  
👨‍👩‍👧 Family Owned Since 2024
📅 Book below ⬇️
```

**Website**: https://thorstenson.guide/booking

### 3. Connect Facebook
1. Settings → Account → Linked Accounts
2. Connect to Facebook Page (create one if needed)
3. This enables Meta Business Suite for scheduling posts

### 4. First Posts Ideas
- Welcome post introducing James & the business
- Best catches from past seasons
- Scenic shots of favorite fishing spots
- Family photo with "Meet your guides"
- Tips for first-time Boundary Waters visitors

### 5. Hashtag Strategy
Always include:
- #ElyMN #ElyMinnesota
- #BoundaryWaters #BWCA
- #MinnesotaFishing #MNFishing
- #FishingGuide #FishingCharter
- #Walleye #NorthernPike (when relevant)

### 6. Posting Schedule
- **Peak Season** (May-Sept): 2-3 posts/week
- **Off Season**: 1 post/week
- **Best Times**: 6-8 AM or 5-7 PM

## For Tony - Technical Integration

### Current Implementation
The website has a gallery page with Instagram-style layout ready at `/gallery`

### Integration Decision: Behold Personal Tier ($6/month)

We've selected **Behold.so Personal Tier** for automatic Instagram integration:
- **Cost**: $6/month (monthly billing)
- **Views**: 15,000/month (plenty for a guide service)
- **Posts**: Shows up to 50 recent posts
- **Updates**: Every minute (near real-time)
- **Hashtags**: Up to 3 per feed

#### Implementation Steps

1. **Sign up at Behold.so**
   - Start with free account to test
   - Upgrade to Personal ($6/mo) when ready

2. **Connect Instagram**
   - Authorize @thorstenson_guide account
   - Configure feed settings

3. **Add to Gallery Page**
   ```tsx
   // In /src/app/gallery/page.tsx
   import Script from 'next/script';

   export default function Gallery() {
     return (
       <>
         <Script src="https://w.behold.so/widget.js" />
         <div 
           className="behold-feed" 
           data-feed-id="YOUR_FEED_ID"
         />
       </>
     );
   }
   ```

4. **Customize Appearance**
   - Match site colors and fonts
   - Choose grid layout
   - Set mobile responsiveness

### Why Behold?
- No coding required after initial setup
- Automatically syncs new Instagram posts
- Professional appearance without "powered by" branding
- Reliable service with good support
- GDPR/CCPA compliant

### Technical Notes
- No environment variables needed with Behold
- Feed ID will be provided by Behold after setup
- Widget loads client-side, no server configuration required

## Timeline
1. **Week 1**: Brittney creates account, adds 5-10 initial posts
2. **Week 2**: Build following, engage with local businesses
3. **Week 3**: Tony integrates feed into website
4. **Ongoing**: Regular posting schedule

## Tips for Success
- Respond to comments quickly
- Tag clients (with permission) in their catch photos
- Partner with local businesses for cross-promotion
- Share stories daily during trips
- Save highlights: "2024 Season", "Trophy Catches", "About Us"