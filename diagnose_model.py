"""
Model Diagnostic Script
Run this to check if your models can be loaded correctly
"""

import os
import pickle
import sys

print("="*70)
print("CLOUD SECURITY DASHBOARD - MODEL DIAGNOSTICS")
print("="*70)

# 1. Check current working directory
print("\n1. CURRENT WORKING DIRECTORY:")
print(f"   {os.getcwd()}")

# 2. Check script location
print("\n2. SCRIPT LOCATION:")
script_dir = os.path.dirname(os.path.abspath(__file__))
print(f"   {script_dir}")

# 3. Look for models directory
print("\n3. SEARCHING FOR MODELS DIRECTORY:")

possible_paths = [
    os.path.join(os.getcwd(), 'models'),
    os.path.join(script_dir, 'models'),
    'models',
    './models',
    '.\\models'
]

models_dir = None
for path in possible_paths:
    print(f"   Checking: {path}")
    if os.path.exists(path):
        models_dir = path
        print(f"   ✅ FOUND: {path}")
        break
    else:
        print(f"   ❌ Not found")

if models_dir is None:
    print("\n❌ ERROR: Models directory not found!")
    print("\nPlease ensure you have a 'models' folder with the following structure:")
    print("""
    your_project/
    ├── app.py
    ├── diagnose_models.py (this script)
    └── models/
        ├── rf_model.pkl
        ├── xgb_clf.pkl
        ├── isolation_forest.pkl
        ├── if_scaler.pkl
        └── preprocessor.pkl
    """)
    sys.exit(1)

# 4. List files in models directory
print(f"\n4. FILES IN MODELS DIRECTORY ({models_dir}):")
try:
    files = os.listdir(models_dir)
    if not files:
        print("   ⚠️  Directory is empty!")
    else:
        for f in files:
            filepath = os.path.join(models_dir, f)
            size = os.path.getsize(filepath)
            print(f"   - {f} ({size:,} bytes = {size/1024:.2f} KB)")
except Exception as e:
    print(f"   ❌ Error listing files: {e}")
    sys.exit(1)

# 5. Check required model files
print("\n5. CHECKING REQUIRED MODEL FILES:")
required_files = {
    'rf_model.pkl': 'Random Forest',
    'xgb_clf.pkl': 'XGBoost',
    'isolation_forest.pkl': 'Isolation Forest',
    'if_scaler.pkl': 'Scaler',
    'preprocessor.pkl': 'Preprocessor'
}

missing_files = []
for filename, description in required_files.items():
    filepath = os.path.join(models_dir, filename)
    if os.path.exists(filepath):
        print(f"   ✅ {description:20s} : {filename}")
    else:
        print(f"   ❌ {description:20s} : {filename} NOT FOUND")
        missing_files.append(filename)

if missing_files:
    print(f"\n⚠️  WARNING: {len(missing_files)} file(s) missing: {', '.join(missing_files)}")

# 6. Try loading each model
print("\n6. ATTEMPTING TO LOAD MODELS:")

model_files = {
    'Random Forest': 'rf_model.pkl',
    'XGBoost': 'xgb_clf.pkl',
    'Isolation Forest': 'isolation_forest.pkl',
    'Scaler': 'if_scaler.pkl',
    'Preprocessor': 'preprocessor.pkl'
}

loaded_models = {}
for model_name, filename in model_files.items():
    filepath = os.path.join(models_dir, filename)
    
    if not os.path.exists(filepath):
        print(f"   ⏭️  {model_name:20s} : SKIPPED (file not found)")
        continue
    
    try:
        with open(filepath, 'rb') as f:
            # Try to read first few bytes to check file validity
            header = f.read(10)
            f.seek(0)  # Reset to beginning
            
            # Load the actual model
            model = pickle.load(f)
            loaded_models[model_name] = model
            
            print(f"   ✅ {model_name:20s} : SUCCESS")
            
            # Try to get model info
            if hasattr(model, 'n_features_in_'):
                print(f"      → Features: {model.n_features_in_}")
            if hasattr(model, 'n_estimators'):
                print(f"      → Estimators: {model.n_estimators}")
            if hasattr(model, 'classes_'):
                print(f"      → Classes: {model.classes_}")
                
    except Exception as e:
        print(f"   ❌ {model_name:20s} : FAILED")
        print(f"      Error: {str(e)}")
        print(f"      Error Type: {type(e).__name__}")
        
        # Additional diagnostics for common errors
        if "invalid load key" in str(e):
            print(f"      ⚠️  This usually means:")
            print(f"         - File is corrupted")
            print(f"         - File is not a pickle file")
            print(f"         - File was created with incompatible Python/pickle version")
            
            # Check file header
            try:
                with open(filepath, 'rb') as f:
                    first_bytes = f.read(20)
                    print(f"      First 20 bytes: {first_bytes[:20]}")
            except:
                pass

# 7. Summary
print("\n" + "="*70)
print("SUMMARY")
print("="*70)
print(f"Models directory: {models_dir}")
print(f"Total files found: {len(files)}")
print(f"Required files: {len(required_files)}")
print(f"Missing files: {len(missing_files)}")
print(f"Successfully loaded: {len(loaded_models)}/{len(model_files)}")

if len(loaded_models) >= 2:  # At least RF and XGB
    print("\n✅ SUCCESS: Models loaded successfully!")
    print("   You can now run the dashboard: streamlit run app.py")
else:
    print("\n❌ FAILED: Unable to load required models")
    print("\nTROUBLESHOOTING STEPS:")
    print("1. Verify model files were created correctly in Google Colab")
    print("2. Make sure you downloaded ALL .pkl files from Colab")
    print("3. Place all .pkl files in the 'models' folder")
    print("4. Check Python version compatibility (same major version)")
    print("5. Try re-downloading the files (they may be corrupted)")
    
print("\n" + "="*70)

# 8. Additional info
print("\nADDITIONAL INFORMATION:")
print(f"Python version: {sys.version}")
print(f"Pickle protocol: {pickle.DEFAULT_PROTOCOL}")

try:
    import sklearn
    print(f"Scikit-learn version: {sklearn.__version__}")
except:
    print("Scikit-learn: Not installed")

try:
    import xgboost
    print(f"XGBoost version: {xgboost.__version__}")
except:
    print("XGBoost: Not installed")

print("\n" + "="*70)