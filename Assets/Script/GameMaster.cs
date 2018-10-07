/* Babylon Editor Script Component (C# UnityScript) */

using System;
using UnityEditor;
using UnityEngine;
using Unity3D2Babylon;

namespace MyProject
{
    public class GameMaster : EditorScriptComponent
    {
        [Header("-Script Properties-")]

        [BabylonProperty]
        public string hello = "Hello World";

        protected GameMaster()
        {
            this.babylonClass = "PROJECT.GameMesterComponent";
        }
    }
}