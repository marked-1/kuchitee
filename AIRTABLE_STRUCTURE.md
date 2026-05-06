# KuchiTee Airtable Structure - Complete Automation Database

## Overview
Airtable serves as the **single source of truth** for all KuchiTee products, designs, analytics, and automation. This database powers all 8 agents and 6 automation scenarios.

---

## Database Schema

### Table 1: Products Master
**Purpose:** Central product database with all design information and metadata

| Field Name | Type | Description | Example |
|-----------|------|-------------|---------|
| SKU | Single Line Text | Unique product identifier | `ANIME_DB_001` |
| Niche | Single Select | Product niche category | Football, Anime, Gaming, etc. |
| Design Text | Long Text | Design concept and description | "Goku Spirit - Dragon Ball Legend" |
| Image Prompt | Long Text | AI image generation prompt | "Premium streetwear t-shirt design. 'GOKU SPIRIT' with golden aura..." |
| Image URL | URL | Cloud storage image link | `https://d2xsxph8kpxj0f.cloudfront.net/...` |
| Title | Single Line Text | Product title for Etsy/Website | "GOKU SPIRIT - Dragon Ball Legend" |
| Description | Long Text | Full product description | "Premium streetwear celebrating the legendary Goku spirit..." |
| Tags | Multiple Select | SEO tags for Etsy | anime, dragonball, goku, streetwear |
| Caption | Long Text | Social media caption | "Celebrate the legendary Goku spirit with this premium..." |
| Status | Single Select | Product status | Draft, Ready, Listed, Active, Winner |
| Views | Number | Product page views | 1250 |
| Sales | Number | Units sold | 45 |
| Winner | Checkbox | Auto-flag if sales > threshold | TRUE/FALSE |

**Key Automation Triggers:**
- When Status = "Ready" → Listing Agent creates Etsy listing
- When Status = "Active" → Content Agent posts to social media
- When Sales > 50 → Winner flag = TRUE → Scaling Agent creates variations
- Daily update: Views and Sales from Etsy API

---

### Table 2: Trend Analysis
**Purpose:** Track trending topics and niche performance

| Field Name | Type | Description |
|-----------|------|-------------|
| Trend ID | Single Line Text | Unique trend identifier |
| Trend Name | Single Line Text | Trending topic/keyword |
| Niche | Link to Products Master | Associated niche |
| Search Volume | Number | Monthly search volume |
| Competition | Single Select | Low/Medium/High |
| Opportunity Score | Number | 1-100 ranking |
| Date Detected | Date | When trend was identified |
| Status | Single Select | Active/Expired/Monitoring |
| Design Prompt | Long Text | Generated design brief |
| Assigned To | Single Line Text | Design Agent assignment |

**Key Automation Triggers:**
- Daily: Trend Agent scans Google Trends, Reddit, TikTok
- When Opportunity Score > 75 → Auto-create design brief
- When Status = "Active" → Notify Design Agent

---

### Table 3: Design Pipeline
**Purpose:** Track design generation workflow

| Field Name | Type | Description |
|-----------|------|-------------|
| Design ID | Single Line Text | Unique design identifier |
| Trend ID | Link to Trend Analysis | Source trend |
| Niche | Single Select | Design niche |
| Design Brief | Long Text | Detailed design specifications |
| Status | Single Select | Concept, Prompt Ready, Image Generated, Approved, Rejected |
| Image Prompt | Long Text | Finalized AI prompt |
| Image URL | URL | Generated image link |
| Created Date | Date | Design creation date |
| Approved Date | Date | Approval date |
| Assigned To | Single Line Text | Design Agent name |
| Notes | Long Text | Design feedback/notes |

**Key Automation Triggers:**
- When Status = "Prompt Ready" → Image Agent generates image
- When Image URL populated → Auto-create product in Products Master
- When Status = "Approved" → Status changes to "Ready" in Products Master

---

### Table 4: Etsy Listings
**Purpose:** Track Etsy product listings and performance

| Field Name | Type | Description |
|-----------|------|-------------|
| Listing ID | Single Line Text | Etsy listing ID |
| SKU | Link to Products Master | Associated product |
| Etsy Title | Single Line Text | Etsy product title |
| Etsy URL | URL | Etsy product link |
| Status | Single Select | Active, Inactive, Delisted |
| Views (Etsy) | Number | Etsy page views |
| Favorites | Number | Etsy favorites count |
| Sales (Etsy) | Number | Units sold on Etsy |
| Revenue | Currency | Total revenue from this listing |
| Last Updated | Date | Last sync from Etsy API |
| Performance Score | Number | 1-100 ranking |

**Key Automation Triggers:**
- Daily: Analytics Agent syncs data from Etsy API
- When Sales > 50 → Flag as "Winner"
- When Performance Score > 80 → Scaling Agent creates variations

---

### Table 5: Social Media Content
**Purpose:** Manage social media posts and engagement

| Field Name | Type | Description |
|-----------|------|-------------|
| Post ID | Single Line Text | Unique post identifier |
| SKU | Link to Products Master | Associated product |
| Platform | Single Select | Instagram, TikTok, Facebook, Pinterest |
| Caption | Long Text | Post caption |
| Image URL | URL | Post image |
| Video URL | URL | Post video (if applicable) |
| Hashtags | Single Line Text | Post hashtags |
| Scheduled Date | Date | Post schedule date |
| Posted Date | Date | Actual post date |
| Status | Single Select | Draft, Scheduled, Posted, Archived |
| Likes | Number | Post likes count |
| Comments | Number | Post comments count |
| Shares | Number | Post shares count |
| Engagement Rate | Percent | Engagement percentage |

**Key Automation Triggers:**
- When Product Status = "Active" → Content Agent creates social posts
- Scheduled Date → Auto-post to Instagram/TikTok
- Daily: Analytics Agent syncs engagement metrics
- When Engagement Rate > 5% → Flag as high-performing

---

### Table 6: Analytics Dashboard
**Purpose:** Real-time business metrics and KPI tracking

| Field Name | Type | Description |
|-----------|------|-------------|
| Date | Date | Tracking date |
| Total Products | Number | Total products in catalog |
| Active Listings | Number | Active Etsy listings |
| Total Views | Number | Combined views (Website + Etsy + Social) |
| Total Sales | Number | Total units sold |
| Total Revenue | Currency | Total revenue (India + Global) |
| India Sales | Number | Sales from India |
| Global Sales | Number | Sales outside India |
| India Revenue | Currency | Revenue from India (₹) |
| Global Revenue | Currency | Revenue from Global ($) |
| Average Order Value | Currency | AOV calculation |
| Conversion Rate | Percent | Sales/Views percentage |
| Top Niche | Single Select | Best-performing niche |
| Top Product | Link to Products Master | Best-selling product |
| Daily Target | Number | Daily sales target (67 orders) |
| Target Status | Single Select | On Track / Behind / Ahead |

**Key Automation Triggers:**
- Daily: All metrics auto-calculated from Products Master + Etsy API + Social APIs
- When Daily Sales < 67 → Alert notification
- When Daily Sales > 67 → Celebration notification
- Monthly: Generate performance report

---

### Table 7: Scaling Winners
**Purpose:** Track winning designs and variation generation

| Field Name | Type | Description |
|-----------|------|-------------|
| Winner ID | Single Line Text | Unique winner identifier |
| Original SKU | Link to Products Master | Original winning product |
| Niche | Single Select | Product niche |
| Sales Count | Number | Total sales of original |
| Variation Count | Number | Number of variations created |
| Variation 1 SKU | Link to Products Master | First variation SKU |
| Variation 2 SKU | Link to Products Master | Second variation SKU |
| Variation 3 SKU | Link to Products Master | Third variation SKU |
| Status | Single Select | Active, Paused, Archived |
| Created Date | Date | Winner detection date |
| Total Variation Sales | Number | Combined sales of all variations |
| Total Variation Revenue | Currency | Combined revenue from variations |

**Key Automation Triggers:**
- When Product Sales > 50 → Scaling Agent flags as winner
- Auto-generate 3 variations with different colors/styles
- New variations auto-added to Products Master
- New variations auto-posted to social media

---

## Automation Flows

### Flow 1: Trend → Design → Image → Listing
1. **Trend Agent** (Daily): Scans trends, adds to Trend Analysis table
2. **Design Agent** (Auto): Creates design brief for high-opportunity trends
3. **Image Agent** (Auto): Generates image from prompt
4. **Listing Agent** (Auto): Creates Etsy listing from approved design
5. **Content Agent** (Auto): Posts to social media

### Flow 2: Analytics → Performance Tracking
1. **Analytics Agent** (Daily): Syncs Etsy API, social APIs, website analytics
2. Updates Views, Sales, Engagement metrics in Products Master
3. Calculates KPIs in Analytics Dashboard
4. Flags winners (Sales > 50)

### Flow 3: Winner → Scaling
1. **Scaling Agent** (Daily): Detects winners from Products Master
2. Generates 3 color/style variations
3. Creates new SKUs in Products Master
4. Auto-posts variations to social media
5. Tracks variation performance

### Flow 4: Daily Monitoring
1. **Monitoring Agent** (Daily): Checks all metrics
2. Compares Daily Sales vs. Target (67 orders)
3. Sends alerts if behind target
4. Generates daily performance report
5. Identifies underperforming products for optimization

---

## Integration Points

### Google Sheets (Airtable Alternative)
All tables can be replicated in Google Sheets with the same structure. Google Apps Script will automate all triggers and workflows.

### External APIs
- **Etsy API**: Sync listings, views, sales, revenue
- **Instagram API**: Sync post engagement metrics
- **TikTok API**: Sync video engagement metrics
- **Google Trends API**: Detect trending topics
- **Reddit API**: Monitor niche discussions

### Google Apps Script
- Scheduled triggers for daily automation
- API integrations for Etsy, Instagram, TikTok
- Automated email alerts and reports
- Data synchronization between sheets

---

## Access & Permissions

| Role | Access Level | Responsibilities |
|------|--------------|------------------|
| Admin (You) | Full Access | Oversee all operations, make strategic decisions |
| Trend Agent | Read/Write Trend Analysis | Add trends, update opportunity scores |
| Design Agent | Read/Write Design Pipeline | Create design briefs, manage design workflow |
| Image Agent | Read/Write Design Pipeline | Generate and upload images |
| Listing Agent | Read/Write Etsy Listings | Create and manage Etsy listings |
| Content Agent | Read/Write Social Media Content | Create and schedule social posts |
| Analytics Agent | Read/Write Analytics Dashboard | Sync data, calculate metrics |
| Scaling Agent | Read/Write Scaling Winners | Detect winners, create variations |

---

## Key Metrics & Targets

**Monthly Target:** 2000 orders
**Daily Target:** 67 orders
**India Pricing:** ₹599 per unit
**Global Pricing:** $24.99 per unit
**Profit Margin:** ₹250/unit (India), $10-12/unit (Global)
**Winner Threshold:** 50+ sales
**High Engagement:** > 5% engagement rate
**Conversion Rate Target:** 2-3%

---

## Next Steps

1. Create Google Sheet with these 7 tables
2. Set up Google Apps Script for automation
3. Configure API integrations (Etsy, Instagram, TikTok)
4. Test all automation flows
5. Deploy and monitor daily
