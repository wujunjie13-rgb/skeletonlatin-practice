# Skeleton Latin Practice

An interactive learning website for practicing Latin names of human skeleton anatomy.

## Features

### 1. Comprehensive Bone Data
- **Complete human skeleton data**: Including skull, spine, thorax, upper limb bones, pelvic girdle and lower limb bones
- **Detailed anatomical features**: Important anatomical landmarks such as surfaces, protuberances, and foramina for each bone
- **Multi-language support**:
  - Latin names
  - Finnish names
  - Pronunciation guide

### 2. Practice Mode
- **Interactive quiz**: Practice by entering Latin names
- **Instant feedback**: Immediately shows whether the answer is correct
- **Auto pronunciation**: Text-to-speech support for playing Latin bone name pronunciations
- **Progress tracking**: Shows current practice progress
- **Settings options**:
  - Show/hide Finnish
  - Enable/disable auto pronunciation

### 3. Browse Mode
- **Category browsing**: Filter by bone category (skull, spine, etc.)
- **Search function**: Quickly find specific bones
- **Detailed information**: View complete information for each bone

### 4. Mistake Bank System
- **Auto collect mistakes**: Wrong answers are automatically added to the mistake bank
- **Repeat practice**: Practice specifically on items in the mistake bank
- **Error statistics**: Record the number of errors for each question
- **Smart removal**: Automatically removed from mistake bank after 3 correct answers

### 5. Learning Statistics
- **Total questions**: Record total number of questions practiced
- **Accuracy**: Real-time calculation of answer accuracy
- **Mistake count**: Display current number of items in mistake bank
- **Mastered**: Display number of bones mastered

## Usage

1. Open the `index.html` file in a browser
2. Choose different modes:
   - **Practice Mode**: Practice bone names
   - **Browse Bones**: View detailed information for all bones
   - **Mistake Bank**: View and practice mistakes
   - **Statistics**: View learning progress and statistics

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage (for data persistence)
- Web Speech API (for pronunciation)

## Bone Categories

1. **Skull**: 14 bones
   - Including frontal, parietal, occipital, temporal, sphenoid, ethmoid, etc.

2. **Vertebral Column**: 7 types
   - Cervical vertebrae, thoracic vertebrae, lumbar vertebrae, sacrum, coccyx, etc.

3. **Thorax**: 5 types
   - Sternum, ribs (true ribs, false ribs, floating ribs)

4. **Upper Limb**: 15 types
   - Clavicle, scapula, humerus, radius, ulna, carpals, metacarpals, phalanges

5. **Pelvic Girdle**: 4 types
   - Hip bone, ilium, ischium, pubis

6. **Lower Limb**: 11 types
   - Femur, patella, tibia, fibula, tarsals, metatarsals, phalanges, etc.

## Data Persistence

The application uses browser LocalStorage to save:
- Learning progress
- Answer statistics
- Mistake bank content

## Browser Compatibility

Recommended modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

## Development

This is a pure static website with no build steps. Simply open `index.html` in a browser to use.

## License

MIT