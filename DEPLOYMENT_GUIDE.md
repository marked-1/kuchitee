# KuchiTee Complete Automation System - Deployment Guide

## Overview
This guide walks you through deploying the complete KuchiTee automated business system with 8 agents, 6 automation scenarios, and daily monitoring.

---

## STEP 1: Create Google Sheet Database

### 1.1 Create New Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Create new spreadsheet"
3. Name it: **"KuchiTee Automation Master"**
4. Copy the Sheet ID from URL (format: `1a2b3c4d5e6f7g8h9i0j`)

### 1.2 Create 7 Tables

Create these 7 sheets in your Google Sheet:

**Sheet 1: Products Master**
| SKU | Niche | Design Text | Image Prompt | Image URL | Title | Description | Tags | Caption | Status | Views | Sales | Winner |

**Sheet 2: Trend Analysis**
| Trend ID | Trend Name | Niche | Search Volume | Competition | Opportunity Score | Date Detected | Status | Design Prompt | Assigned To |

**Sheet 3: Design Pipeline**
| Design ID | Trend ID | Niche | Design Brief | Status | Image Prompt | Image URL | Created Date | Approved Date | Assigned To | Notes |

**Sheet 4: Etsy Listings**
| Listing ID | SKU | Etsy Title | Etsy URL | Status | Views (Etsy) | Favorites | Sales (Etsy) | Revenue | Last Updated | Performance Score |

**Sheet 5: Social Media Content**
| Post ID | SKU | Platform | Caption | Image URL | Video URL | Hashtags | Scheduled Date | Posted Date | Status | Likes | Comments | Shares | Engagement Rate |

**Sheet 6: Analytics Dashboard**
| Date | Total Products | Active Listings | Total Views | Total Sales | Total Revenue | India Sales | Global Sales | India Revenue | Global Revenue | Average Order Value | Conversion Rate | Top Niche | Top Product | Daily Target | Target Status |

**Sheet 7: Scaling Winners**
| Winner ID | Original SKU | Niche | Sales Count | Variation Count | Variation 1 SKU | Variation 2 SKU | Variation 3 SKU | Status | Created Date | Total Variation Sales | Total Variation Revenue |

---

## STEP 2: Setup Google Apps Script

### 2.1 Create Apps Script Project
1. Go to [Google Apps Script](https://script.google.com)
2. Click "New project"
3. Name it: **"KuchiTee Automation"**

### 2.2 Add Automation Code
1. Copy the entire code from `GOOGLE_APPS_SCRIPT_AUTOMATION.gs`
2. Paste into the Apps Script editor
3. Replace `YOUR_GOOGLE_SHEET_ID` with your actual Sheet ID
4. Click "Save"

### 2.3 Configure Script Properties
1. Click "Project Settings" (gear icon)
2. Enable "Show "appsscript.json" manifest file"
3. In `appsscript.json`, add these scopes:
```json
{
  "timeZone": "Asia/Kolkata",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/script.external_request"
  ]
}
```

### 2.4 Authorize Script
1. Click "Run" button
2. Select function: `runCompleteAutomation`
3. Click "Run"
4. Authorize when prompted
5. Grant permissions to access Google Sheets and Gmail

---

## STEP 3: Setup Scheduled Triggers

### 3.1 Create Daily Triggers
1. In Apps Script, click "Triggers" (clock icon)
2. Click "Create new trigger"
3. Setup these triggers:

| Function | Trigger Type | Time |
|----------|-------------|------|
| `trendAgent_detectTrends` | Day timer | 6:00 AM |
| `designAgent_createBriefs` | Day timer | 7:00 AM |
| `listingAgent_createEtsyListings` | Day timer | 8:00 AM |
| `contentAgent_postToSocial` | Day timer | 9:00 AM |
| `analyticsAgent_syncMetrics` | Day timer | 6:00 PM |
| `scalingAgent_duplicateWinners` | Day timer | 7:00 PM |
| `monitoringAgent_dailyCheck` | Day timer | 8:00 PM |

### 3.2 Set Timezone
1. In Apps Script, click "Project Settings"
2. Set timezone to: **"Asia/Kolkata"** (or your timezone)

---

## STEP 4: Setup Email Notifications

### 4.1 Configure Email
1. In `GOOGLE_APPS_SCRIPT_AUTOMATION.gs`, find these functions:
   - `sendNotification(message)`
   - `sendAlert(message)`

2. Uncomment the email lines:
```javascript
// Change from:
// GmailApp.sendEmail("your-email@gmail.com", "KuchiTee Automation", message);

// To:
GmailApp.sendEmail("your-email@gmail.com", "KuchiTee Automation", message);
```

3. Replace `"your-email@gmail.com"` with your actual email

---

## STEP 5: Setup Etsy API Integration (Optional but Recommended)

### 5.1 Get Etsy API Keys
1. Go to [Etsy Developer Portal](https://www.etsy.com/developers)
2. Create new app
3. Get API Key and API Secret
4. Generate access token

### 5.2 Add to Apps Script
1. In Apps Script, click "Project Settings"
2. Click "Script Properties"
3. Add these properties:
   - Key: `ETSY_API_KEY` | Value: `your-api-key`
   - Key: `ETSY_API_SECRET` | Value: `your-api-secret`
   - Key: `ETSY_ACCESS_TOKEN` | Value: `your-access-token`

### 5.3 Uncomment Etsy API Calls
In `GOOGLE_APPS_SCRIPT_AUTOMATION.gs`, find and uncomment Etsy API calls:
```javascript
// Uncomment this section in listingAgent_createEtsyListings():
// const etsyResponse = UrlFetchApp.fetch('https://api.etsy.com/v3/application/shops/...');
```

---

## STEP 6: Setup Social Media API Integration (Optional)

### 6.1 Instagram Business API
1. Go to [Meta Developers](https://developers.facebook.com)
2. Create app and get access token
3. Add to Script Properties: `INSTAGRAM_ACCESS_TOKEN`

### 6.2 TikTok API
1. Go to [TikTok Developer](https://developers.tiktok.com)
2. Create app and get access token
3. Add to Script Properties: `TIKTOK_ACCESS_TOKEN`

### 6.3 Uncomment API Calls
In `contentAgent_postToSocial()`, uncomment API calls for Instagram and TikTok

---

## STEP 7: Add Initial Products

### 7.1 Populate Products Master Sheet
Add your 45 existing designs to the Products Master sheet:

| SKU | Niche | Design Text | Image Prompt | Image URL | Title | Description | Tags | Caption | Status | Views | Sales | Winner |
|-----|-------|-------------|--------------|-----------|-------|-------------|------|---------|--------|-------|-------|--------|
| ANIME_DB_001 | Anime | Goku Spirit | Premium streetwear... | https://... | GOKU SPIRIT | Premium anime streetwear... | anime, dragonball | Celebrate Goku... | Active | 0 | 0 | FALSE |
| GAMING_ES_001 | Gaming | Pro Gamer | Premium gaming... | https://... | PRO GAMER | Premium gaming streetwear... | gaming, esports | Level up your... | Active | 0 | 0 | FALSE |
| FOOTBALL_001 | Football | CR7 Forever | Premium football... | https://... | CR7 FOREVER | Cristiano Ronaldo tribute... | football, cr7 | GOAT culture... | Active | 0 | 0 | FALSE |

---

## STEP 8: Test the System

### 8.1 Manual Test
1. In Apps Script, click "Run"
2. Select `runCompleteAutomation`
3. Click "Run"
4. Check Google Sheet for new entries

### 8.2 Check Logs
1. Click "Execution log" to see results
2. Verify all agents ran successfully
3. Check for any errors

### 8.3 Verify Automation
1. Check Products Master sheet for new products
2. Check Etsy Listings sheet for new listings
3. Check Social Media Content sheet for new posts
4. Check Analytics Dashboard for metrics

---

## STEP 9: Monitor Daily

### 9.1 Daily Checks
Every morning, check:
1. **Analytics Dashboard** - Daily sales vs. target (67 orders)
2. **Products Master** - New products added
3. **Etsy Listings** - New listings created
4. **Social Media Content** - Posts scheduled
5. **Scaling Winners** - New variations created

### 9.2 Weekly Review
Every week, review:
1. Total sales and revenue
2. Top-performing niches
3. Top-selling products
4. Engagement rates on social media
5. Conversion rates

### 9.3 Monthly Optimization
Every month:
1. Analyze performance data
2. Identify underperforming products
3. Pause low-performing niches
4. Scale winners aggressively
5. Adjust pricing if needed

---

## STEP 10: Scale & Expand

### 10.1 Add New Designs
1. Add to Design Pipeline sheet
2. System automatically creates products and listings
3. Posts to social media automatically

### 10.2 Add New Niches
1. Update Trend Analysis sheet with new niches
2. Design Agent creates briefs
3. Image Agent generates images
4. Listing Agent creates listings
5. Content Agent posts to social

### 10.3 Expand to New Platforms
1. Add new social media platforms to Content Agent
2. Get API keys for new platforms
3. Add to Script Properties
4. System automatically posts to all platforms

---

## Troubleshooting

### Issue: Script Not Running
**Solution:**
1. Check triggers are enabled (Triggers page)
2. Check timezone is set correctly
3. Check Script Properties are configured
4. Run manually to test

### Issue: No Emails Received
**Solution:**
1. Uncomment email lines in script
2. Replace email address with your actual email
3. Check Gmail spam folder
4. Verify Gmail API is authorized

### Issue: Etsy Listings Not Created
**Solution:**
1. Check Etsy API keys in Script Properties
2. Verify API keys are valid
3. Check Etsy API rate limits
4. Uncomment Etsy API calls in script

### Issue: Social Media Posts Not Posted
**Solution:**
1. Check Instagram/TikTok API keys
2. Verify API keys are valid
3. Check platform rate limits
4. Uncomment API calls in script

---

## Success Metrics

Track these KPIs to measure success:

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Daily Orders | 67 | 0 | 🔴 |
| Monthly Orders | 2000 | 0 | 🔴 |
| India Sales % | 60% | 0% | 🔴 |
| Global Sales % | 40% | 0% | 🔴 |
| Conversion Rate | 2-3% | 0% | 🔴 |
| Engagement Rate | > 5% | 0% | 🔴 |
| Winner Products | 10+ | 0 | 🔴 |
| Variations Created | 30+ | 0 | 🔴 |

---

## Next Steps

1. ✅ Create Google Sheet
2. ✅ Setup Apps Script
3. ✅ Configure triggers
4. ✅ Setup email notifications
5. ✅ Integrate Etsy API
6. ✅ Integrate social media APIs
7. ✅ Add initial products
8. ✅ Test the system
9. ✅ Monitor daily
10. ✅ Scale & expand

**You're now ready to launch the fully automated KuchiTee system!**
