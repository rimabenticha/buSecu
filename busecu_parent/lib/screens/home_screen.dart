import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'dart:convert';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late GoogleMapController mapController;

  final LatLng _center = const LatLng(36.8065, 10.1815); // Tunis

  // Variables pour les champs du message
  final TextEditingController _childNameController = TextEditingController();
  final TextEditingController _messageController = TextEditingController();

  void _onMapCreated(GoogleMapController controller) {
    mapController = controller;
  }

  // Fonction pour afficher le popup de notification
  void _showNotificationDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Notification'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Votre enfant est à l\'arrêt: Arrêt 1'),
              SizedBox(height: 10),
              Text('Message de l\'administrateur:'),
              Text('Le bus arrivera dans 5 minutes.'),
            ],
          ),
          actions: <Widget>[
            TextButton(
              child: Text('Fermer'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  // Fonction pour envoyer le message au backend
  Future<void> _sendMessage() async {
    final String childName = _childNameController.text;
    final String message = _messageController.text;

    if (childName.isEmpty || message.isEmpty) {
      // Assure-toi que les champs sont remplis
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Veuillez remplir tous les champs')),
      );
      return;
    }

    try {
      final response = await http.post(
        Uri.parse(
          'http://192.168.1.13:5000/api/messages',
        ), // URL de ton backend
        headers: <String, String>{'Content-Type': 'application/json'},
        body: jsonEncode(<String, String>{
          'childName': childName,
          'message': message,
          'parentEmail': 'BuSecu@ecole.com', // Email du parent
        }),
      );

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('Message envoyé avec succès!')));
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Erreur lors de l\'envoi du message')),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Erreur réseau : $e')));
    }
  }

  // Fonction pour afficher le popup d'envoi de message
  void _showMessageDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Envoyer un message'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextField(
                controller: _childNameController,
                decoration: InputDecoration(labelText: 'Nom de l\'enfant'),
              ),
              TextField(
                controller: _messageController,
                decoration: InputDecoration(labelText: 'Message'),
                maxLines: 3,
              ),
              SizedBox(height: 10),
              Text('Contacter nous:'),
              Text('Téléphone: 51223645'),
              Text('Email: BuSecu@ecole.com'),
            ],
          ),
          actions: <Widget>[
            TextButton(
              child: Text('Fermer'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: Text('Envoyer'),
              onPressed: () {
                _sendMessage(); // Envoie le message au backend
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: Text('BuSecu', style: TextStyle(color: Colors.white)),
        actions: [
          IconButton(
            icon: Icon(Icons.notifications, color: Colors.white),
            onPressed:
                _showNotificationDialog, // ==> ici on appelle bien le popup de notification
          ),
          IconButton(
            icon: Icon(Icons.message, color: Colors.white),
            onPressed:
                _showMessageDialog, // ==> ici on appelle bien le popup d'envoi de message
          ),
        ],
        backgroundColor: Color.fromARGB(255, 3, 22, 119),
      ),
      body: GoogleMap(
        onMapCreated: _onMapCreated,
        initialCameraPosition: CameraPosition(target: _center, zoom: 14.0),
      ),
    );
  }
}
