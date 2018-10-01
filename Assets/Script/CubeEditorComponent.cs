/* Babylon Editor Script Component (C# UnityScript) */

using System;
using UnityEditor;
using UnityEngine;
using Unity3D2Babylon;

namespace MyProject
{
	public class CubeEditorComponent : EditorScriptComponent
	{
		[Header("-Script Properties-")]

		[BabylonProperty]
		public string hello = "Hello World";

		protected CubeEditorComponent()
		{
			this.babylonClass = "PROJECT.CubeComponent";
		}
	}
}