# URL Metadata Extractor

A TypeScript utility that extracts metadata (title, description, image, date, favicon) from any given URL. This tool makes it easy to get essential meta information from web pages programmatically.

## Features

- Extract page title (OpenGraph or standard)
- Get meta description
- Find featured images
- Extract publication/modification dates
- Fetch favicon/site icon
- Handles relative and absolute URLs
- Support for multiple favicon formats

## Installation

```bash
# Clone the repository
git clone repo

# Navigate to the project directory
cd url-metadata-extractor

# Install dependencies
npm install
```

## Usage

```typescript
import { getURLMetadata } from './metadata';

// Example usage
try {
    const metadata = await getURLMetadata('https://example.com');
    console.log('Metadata:', metadata);
} catch (error) {
    console.error('Error:', error);
}
```

### Output Format

The function returns an object with the following structure:

```typescript
interface URLMetadata {
  title: string;      // Page title
  imageURL: string;   // Featured image URL
  description: string;// Page description
  date: string;       // Publication/modification date
  favicon: string;    // Favicon URL
}
```

### Example Response

```json
{
  "title": "Example Website",
  "imageURL": "https://example.com/featured-image.jpg",
  "description": "This is an example website description",
  "date": "2024-01-01T00:00:00Z",
  "favicon": "https://example.com/favicon.ico"
}
```

## Development

```bash
# Build the project
npm run build

# Run the example
npm start
```

## Features in Detail

### Favicon Detection
The utility checks for favicons in the following order:
1. Apple touch icons
2. Standard favicon links
3. Shortcut icons
4. Mask icons
5. Default `/favicon.ico` location

### Metadata Priority
For each metadata type, the utility checks multiple sources in order of preference:
- Title: OpenGraph title → HTML title tag
- Image: OpenGraph image → Twitter image
- Description: OpenGraph description → meta description
- Date: Article published time → Article modified time → time tag

## Error Handling

The utility includes comprehensive error handling for:
- Network request failures
- Invalid URLs
- Missing metadata
- Malformed HTML
- Relative URL resolution

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

Copyright (c) 2024 Amit Yedurkar, Script Lanes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Author

**Amit Yedurkar**  
Script Lanes


