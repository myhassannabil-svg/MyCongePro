 // main.bicep — Infrastructure CongiPro
targetScope = 'resourceGroup'

@description('Nom de l\'application')
param appName string = 'congipro'

@description('Environnement')
@allowed(['dev', 'staging', 'prod'])
param environment string = 'prod'

@description('Localisation')
param location string = resourceGroup().location

@description('Mot de passe SQL Admin')
@secure()
param sqlAdminPassword string

// ── Variables ────────────────────────────────────────────────
var suffix     = '
