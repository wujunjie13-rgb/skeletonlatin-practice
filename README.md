# Skeleton Latin Practice

An interactive learning website for practicing Latin names of human skeletal anatomy.

## Features

### 1. Comprehensive Bone Data
- **Complete human skeleton data**: Including skull, spine, thorax, upper limb bones, pelvic girdle, and lower limb bones
- **Detailed anatomical features**: Important anatomical landmarks including surfaces, processes, and foramina
- **Bilingual support**:
  - English names
  - Latin nomenclature
  - Pronunciation guide

### 2. Practice Mode
- **Interactive quiz**: Enter Latin names for practice
- **Instant feedback**: Immediate display of correct/incorrect answers
- **Auto pronunciation**: Text-to-speech support for Latin bone names
- **Progress tracking**: Shows current practice progress
- **Body part filtering**: Practice specific body parts or all together
  - Skull
  - Spine
  - Thorax
  - Shoulder (Clavicle, Scapula)
  - Arm (Humerus)
  - Forearm (Radius, Ulna)
  - Hand (Carpals, Metacarpals, Phalanges)
  - Pelvis
  - Femur (Thigh)
  - Patella (Knee)
  - Tibia & Fibula (Lower leg)
  - Foot (Tarsals, Metatarsals, Phalanges)
- **Randomized questions**: Each practice session randomizes the order
- **Settings options**:
  - Enable/disable auto pronunciation

### 3. Browse Mode
- **Categorized browsing**: Filter by skeletal region
- **Organized by body parts**: Bones grouped by anatomical regions for easy reference
- **Search functionality**: Quickly find specific bones
- **Detailed information**: View complete information for each bone

### 4. Mistake Bank System
- **Auto-collect mistakes**: Incorrectly answered questions automatically added to mistake bank
- **Repeat practice**: Practice specifically from the mistake bank
- **Mistake statistics**: Track error count for each bone
- **Smart removal**: Automatically removed after 3 correct answers
- **Multiple user profiles**: Each user can maintain their own mistake bank
  - Create separate profiles for different users
  - Switch between profiles
  - Independent progress tracking per profile

### 5. Learning Statistics
- **Total questions**: Track total number of practice questions
- **Accuracy rate**: Real-time calculation of answer accuracy
- **Mistake count**: Display current number of bones in mistake bank
- **Mastered count**: Show number of mastered bones

## Usage

1. Open `index.html` in a browser
2. Select different modes:
   - **Practice**: Practice bone names
   - **Browse**: View all bones with detailed information
   - **Mistakes**: View and practice mistakes
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
   - Cervical, thoracic, lumbar vertebrae, sacrum, coccyx, etc.

3. **Thorax**: 5 types
   - Sternum, ribs (true ribs, false ribs, floating ribs)

4. **Upper Limb Bones**: Multiple types organized by region
   - Shoulder: Clavicle, scapula
   - Arm: Humerus
   - Forearm: Radius, ulna
   - Hand: Carpals, metacarpals, phalanges

5. **Pelvic Girdle**: 4 types
   - Hip bone, ilium, ischium, pubis

6. **Lower Limb Bones**: Multiple types organized by region
   - Femur (thigh)
   - Patella (knee)
   - Tibia & Fibula (lower leg)
   - Foot: Tarsals, metatarsals, phalanges

## Data Persistence

The application uses browser LocalStorage to save:
- Learning progress per user profile
- Answer statistics per user profile
- Mistake bank content per user profile
- User profiles

## Browser Compatibility

Recommended modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

## Development

This project is a pure static website with no build steps. Simply open `index.html` in a browser to use.

## License

MIT