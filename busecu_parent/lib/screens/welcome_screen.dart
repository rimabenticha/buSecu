import 'package:flutter/material.dart';
import 'login_screen.dart';

class WelcomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var styleFrom = ElevatedButton.styleFrom(
      foregroundColor: const Color.fromARGB(255, 245, 243, 243),
      backgroundColor: const Color.fromARGB(255, 3, 22, 126),
      padding: EdgeInsets.symmetric(horizontal: 30, vertical: 15),
      textStyle: TextStyle(fontSize: 18),
    );
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'BuSecu',
                style: TextStyle(
                  fontSize: 50,
                  fontWeight: FontWeight.bold,
                  color: const Color.fromARGB(255, 42, 38, 1),
                ),
              ),
              SizedBox(height: 30),
              Text(
                'Avec BuSecu, soyez là même quand vous n’êtes pas là',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 20, color: Colors.black),
              ),
              SizedBox(height: 50),
              ElevatedButton(
                onPressed: () {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(builder: (context) => LoginScreen()),
                  );
                },
                style: styleFrom,
                child: Text('Commencer'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
