package be.mstaessen.thesis.expense;

import android.os.Bundle;
import org.apache.cordova.DroidGap;

public class Expense extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}
